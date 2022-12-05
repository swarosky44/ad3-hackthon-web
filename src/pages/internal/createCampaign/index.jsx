import { useMemo } from 'react';
import { Descriptions, Table, Modal } from 'antd';
import { ethers } from 'ethers';
import { request } from '../../../utils/request';
import CampaignAbi from '../Campaign.json';
import styles from '../index.less';

export default ({
  ad3HubAddress = '',
  ad3TokenAddress = '',
  contract = {},
  defaultCampaignData = {},
  kols = [],
  budget = 0,
  token = {},
  signer = {},
  setCampaignData = () => {},
}) => {
  const userFee = 10;
  // 创建合约
  const createCampaign = async () => {
    try {
      console.log('budget:' + budget);
      console.log(
        'budgetValue:' + ethers.utils.parseUnits(budget.toString(), 6),
      );
      await token.approve(
        ad3HubAddress,
        ethers.utils.parseUnits(budget.toString(), 6),
      );
      kols = kols.map((s) => ({
        ...s,
        fixedFee: ethers.utils.parseUnits(s.fixedFee.toString(), 6),
      }));
      console.log('kols:', kols);
      await contract.createCampaign(
        kols,
        ethers.utils.parseUnits(budget.toString(), 6),
        ethers.utils.parseUnits(userFee.toString(), 6),
        {
          gasLimit: 15000000,
          gasPrice: 10 * 10 ** 9,
        },
      );
      console.info(2);
      //Check campaign's address
      const signerAddress = await signer.getAddress();
      const campaignAddressList = await contract.getCampaignAddressList(
        signerAddress,
      );
      console.info('campaignAddressList', campaignAddressList);
      const campaignAddress = await contract.getCampaignAddress(
        signerAddress,
        campaignAddressList.length,
      );
      console.log('campaignAddress:' + campaignAddress);

      // Check campaign's balance
      const Campaign = new ethers.Contract(
        campaignAddress,
        CampaignAbi,
        signer,
      );
      const balance = await Campaign.remainBalance();
      console.log('balance1:' + balance);

      const result = await request({
        method: 'POST',
        api: 'api/campaign/createCampaign',
        params: {
          ...defaultCampaignData,
          contractAddress: campaignAddress,
          projectAddress: signerAddress,
        },
      });

      if (result && `${result.code}` === '200') {
        setCampaignData({
          ...data,
          contractAddress: campaignAddress,
          projectAddress: signerAddress,
        });
        localStorage.setItem(
          'campaignData',
          JSON.stringify({
            ...data,
            contractAddress: campaignAddress,
            projectAddress: signerAddress,
          }),
        );
        Modal.success({
          title: '创建订单合约成功',
          content: (
            <Descriptions title="合约信息" column={1} bordered>
              <Descriptions.Item label="合约地址">
                {campaignAddress}
              </Descriptions.Item>
              <Descriptions.Item label="合约资金">
                {ethers.utils.formatUnits(balance.toNumber(), 6)}
              </Descriptions.Item>
            </Descriptions>
          ),
        });
      } else {
        Modal.warn({
          title: '创建订单合约失败',
          content: null,
        });
      }
    } catch (error) {
      Modal.warn({
        title: '创建订单合约失败',
        content: JSON.stringify(error),
      });
    }
  };

  return (
    <div className={styles.module}>
      <Descriptions
        title="合约信息"
        bordered
        column={1}
        style={{ marginBottom: '24px' }}
      >
        <Descriptions.Item label="AD3Hub 合约地址">
          {ad3HubAddress}
        </Descriptions.Item>
        <Descriptions.Item label="AD3Token 合约地址">
          {ad3TokenAddress}
        </Descriptions.Item>
        <Descriptions.Item label="AD3Token Approve 额度">
          {budget}
        </Descriptions.Item>
        <Descriptions.Item label="单个用户激励金额">
          {userFee}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="CreateCampaign 参数信息" bordered column={1}>
        <Descriptions.Item label="预算">{budget}</Descriptions.Item>
        <Descriptions.Item label="KOL 信息">
          <Table
            columns={[
              {
                title: 'KOL 钱包地址',
                dataIndex: 'kolAddress',
                key: 'kolAddress',
              },
              {
                title: '内容制作费',
                dataIndex: 'fixedFee',
                key: 'fixedFee',
              },
              {
                title: '抽成比例',
                dataIndex: 'ratio',
                key: 'ratio',
              },
            ]}
            rowKey="kolAddress"
            dataSource={kols}
            pagination={false}
          />
        </Descriptions.Item>
      </Descriptions>
      <div className={styles.button} onClick={createCampaign}>
        创建合约
      </div>
    </div>
  );
};
