import { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import { Card } from 'antd';
import { useModel } from 'umi';
import WalletButton from '@/components/walletButton';
import CreateCampaign from './createCampaign';
import PayfixFee1 from './payfixFee1';
import PayfixFee2 from './payfixFee2';
import PushPay from './pushPay';
import WithDraw from './withDraw';
import AD3HubAbi from './AD3Hub.json';
import styles from './index.less';

const defaultCampaignData = {
  contractAddress: '',
  projectAddress: '',
  campaignName:
    'Magipop DAO NFT launch！！！Finish task and get the access to mint NFT',
  startDate: '2022-12-08 23:00:00',
  endDate: '2022-12-12 23:59:59',
  kolScope: 'PUBLIC',
  kolRelationDTOS: [
    {
      kolAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      contentFee: 250,
      conversionRate: 0,
    },
    {
      kolAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      contentFee: 130,
      conversionRate: 0,
    },
  ],
  contentFee: 0,
  conversionRate: 0,
  contentDeadLine: '2022-12-12 23:59:59',
  rewardDTOS: [
    {
      desc: 'USDT',
      type: 'TOKEN',
      winnersNum: 200,
      quota: 100000,
      unit: 'USDT',
    },
  ],
  taskDTOS: [
    {
      name: 'FOLLOW BUBBLE',
      desc: 'follow bubble',
      type: 'SOCIAL_MEDIA',
      subType: 'FOLLOW',
      channel: 'TWITTER',
      actionObject: 'https://twitter.com/intent/follow?screen_name=deritrade',
    },
    {
      name: 'FORWARD TWITTER',
      desc: 'forward twitter',
      type: 'SOCIAL_MEDIA',
      subType: 'FORWARD',
      channel: 'TWITTER',
      actionObject:
        'https://twitter.com/intent/retweet?tweet_id=1580528778840768513',
    },
    {
      name: 'Mint NFT',
      desc: 'click link and mint NFT',
      type: 'SOCIAL_MEDIA',
      subType: 'LIKE',
      channel: '',
      actionObject: 'https://portal.quest3.xyz/',
    },
  ],
};
const ad3HubAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const ad3TokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
export default () => {
  const localCampaignData = localStorage.getItem('campaignData');
  const [activeKey, setActiveKey] = useState('createCampaign');
  const [ad3HubContract, setAd3HubContract] = useState(null);
  const [ad3Token, setAd3Token] = useState(null);
  const [campaginData, setCampaignData] = useState(
    localCampaignData ? JSON.parse(localCampaignData) : defaultCampaignData,
  );
  const { signer } = useModel('global', (model) => ({
    signer: model.signer,
  }));

  // 计算总预算
  const budget = useMemo(() => {
    let result = 0;
    if (campaginData) {
      if (campaginData.rewardDTOS && campaginData.rewardDTOS.length) {
        result += campaginData.rewardDTOS[0].quota;
      }
      if (campaginData.kolRelationDTOS && campaginData.kolRelationDTOS.length) {
        result = campaginData.kolRelationDTOS.reduce((cur, pre) => {
          return cur + pre.contentFee;
        }, result);
      }
    }
    return result;
  }, [campaginData]);

  const kols = useMemo(() => {
    if (campaginData && campaginData.kolRelationDTOS) {
      return campaginData.kolRelationDTOS.map((k) => ({
        kolAddress: k.kolAddress,
        fixedFee: k.contentFee,
        ratio: k.conversionRate,
        paymentStage: 0,
      }));
    }
    return [];
  }, [campaginData]);

  const init = async () => {
    if (signer) {
      const contract = new ethers.Contract(ad3HubAddress, AD3HubAbi, signer);
      const token = new ethers.Contract(
        ad3TokenAddress,
        [
          'function approve(address spender, uint256 amount) external returns (bool)',
        ],
        signer,
      );
      setAd3HubContract(contract);
      setAd3Token(token);
    }
  };

  const renderContent = () => {
    if (ad3HubContract) {
      switch (activeKey) {
        case 'createCampaign':
          return (
            <CreateCampaign
              ad3HubAddress={ad3HubAddress}
              ad3TokenAddress={ad3TokenAddress}
              contract={ad3HubContract}
              data={campaginData}
              budget={budget}
              kols={kols}
              token={ad3Token}
              signer={signer}
              setCampaignData={setCampaignData}
            />
          );
        case 'payfixFee1':
          return (
            <PayfixFee1
              contract={ad3HubContract}
              data={campaginData}
              signer={signer}
              kols={kols}
            />
          );
        case 'payfixFee2':
          return (
            <PayfixFee2
              contract={ad3HubContract}
              data={campaginData}
              signer={signer}
              kols={kols}
            />
          );
        case 'pushPay':
          return (
            <PushPay
              contract={ad3HubContract}
              data={campaginData}
              signer={signer}
              kols={kols}
            />
          );
        case 'withdraw':
          return (
            <WithDraw
              contract={ad3HubContract}
              data={campaginData}
              signer={signer}
              kols={kols}
            />
          );
        default:
          return null;
      }
    }

    return <WalletButton />;
  };

  useEffect(init, [signer]);

  return (
    <div className={styles.module}>
      <Card
        style={{ width: '100%' }}
        bordered={false}
        tabList={[
          { tab: '创建合约', key: 'createCampaign' },
          { tab: '支付定金', key: 'payfixFee1' },
          { tab: '支付内容费', key: 'payfixFee2' },
          { tab: '结算', key: 'pushPay' },
          { tab: '退款', key: 'withdraw' },
        ]}
        activeTabKey={activeKey}
        onTabChange={(key) => setActiveKey(key)}
      >
        {renderContent()}
      </Card>
    </div>
  );
};
