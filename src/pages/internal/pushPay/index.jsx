import { useState, useEffect } from 'react';
import { Table, Modal, Descriptions } from 'antd';
import { ethers } from 'ethers';
import { request } from '../../../utils/request';
import CampaignAbi from '../Campaign.json';
import styles from '../index.less';

export default ({ contract = {}, signer = {}, data }) => {
  const { contractAddress } = data;
  const [checkButton, setCheckButton] = useState(false);
  const [campaignResult, setCampaignResult] = useState([]);

  const pushPay = async () => {
    const signerAddress = await signer.getAddress();
    const campaignAddressList = await contract.getCampaignAddressList(
      signerAddress,
    );
    const campaignIndex = campaignAddressList.findIndex(
      (l) => l === contractAddress,
    );
    await contract.pushPayKol(signerAddress, campaignIndex, campaignResult, {
      gasLimit: 15000000,
      gasPrice: 10 * 10 ** 9,
    });
    setCheckButton(true);
  };

  const checkBalance = async () => {
    const Campaign = new ethers.Contract(contractAddress, CampaignAbi, signer);
    const balance = await Campaign.remainBalance();
    Modal.success({
      title: '查询合约',
      content: (
        <Descriptions title="合约信息" column={1} bordered>
          <Descriptions.Item label="合约资金">
            {ethers.utils.formatUnits(balance.toNumber(), 6)}
          </Descriptions.Item>
        </Descriptions>
      ),
    });
  };

  // 获取结算详情数据
  const getPushpayDetail = async () => {
    const ret = await request({
      method: 'GET',
      api: 'api/campaign/queryCampaignResult',
      params: {
        campaignId: 15,
      },
    });
    if (ret && ret.result && ret.result.length) {
      setCampaignResult(
        ret.result.map((r) => ({
          kolAddress: r.kolAddress,
          quantity: r.cnt,
        })),
      );
    }
  };

  useEffect(() => {
    getPushpayDetail();
  }, []);

  return (
    <div className={styles.module}>
      <Table
        columns={[
          { title: 'KOL 钱包地址', dataIndex: '_address', key: '_address' },
        ]}
        rowKey="_address"
        dataSource={campaignResult}
        pagination={false}
      />
      {checkButton ? (
        <div className={styles.button} onClick={checkBalance}>
          查询合约余额
        </div>
      ) : (
        <div className={styles.button} onClick={pushPay}>
          结算
        </div>
      )}
    </div>
  );
};
