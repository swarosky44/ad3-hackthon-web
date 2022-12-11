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

const { env = 'daily' } = location.search
  .substr(1)
  .split('&')
  .reduce((res, item) => {
    const parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
  }, {});

let ad3HubAddress = '';
let ad3TokenAddress = '';
if (env === 'daily') {
  // 本地环境
  ad3HubAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  ad3TokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
} else if (env === 'test') {
  // 测试网环境
  ad3HubAddress = '0xc1A83b13e858909ac089180D34304259EC3F71Eb';
  ad3TokenAddress = '0x895d46f3a32f4Eb85dcC275C754aB127194F2559';
} else if (env === 'main') {
  // 主网环境
  ad3HubAddress = '0x63ae9644cF5Eda0A3B7f436232C181DbE4542B8E';
  ad3TokenAddress = '0xc2132d05d31c914a87c6611c10748aeb04b58e8f';
} else {
  // 默认本地环境
  ad3HubAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  ad3TokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
}

const defaultCampaignData = {
  contractAddress: '',
  projectAddress: '',
  campaignName: 'Vote for Bubble Observers！',
  startDate: '2022-12-08 00:00:00',
  endDate: '2022-12-12 23:59:59',
  kolScope: 'PUBLIC',
  kolRelationDTOS: [
    {
      kolAddress: '0x69d51aA8fB89f2f6448763Abba7aF1906984a77B',
      contentFee: 1,
      conversionRate: 100,
    },
  ],
  contentFee: 0,
  conversionRate: 0,
  contentDeadLine: '2022-12-12 23:59:59',
  rewardDTOS: [
    {
      desc: 'USDT',
      type: 'TOKEN',
      winnersNum: 2,
      quota: 2,
      unit: 'USDT',
    },
  ],
  taskDTOS: [
    {
      name: 'Follow @BubbleObservers',
      desc: 'follow bubble',
      type: 'SOCIAL_MEDIA',
      subType: 'FOLLOW',
      channel: 'TWITTER',
      actionObject: 'https://twitter.com/BubbleObservers',
    },
    {
      name: 'Retweet',
      desc: 'forward twitter',
      type: 'SOCIAL_MEDIA',
      subType: 'FORWARD',
      channel: 'TWITTER',
      actionObject:
        'https://twitter.com/BubbleObservers/status/1600488947138056192',
    },
    {
      name: 'Vote for us',
      desc: 'click link and mint NFT',
      type: 'SOCIAL_MEDIA',
      subType: 'LIKE',
      channel: '',
      actionObject: 'https://mooar.com/vote',
    },
  ],
};
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
          'event Approval(address indexed owner, address indexed spender, uint256 value)',
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
              defaultCampaignData={defaultCampaignData}
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
