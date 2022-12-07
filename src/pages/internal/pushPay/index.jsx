import { useState, useEffect } from 'react';
import { Table, Modal, Descriptions } from 'antd';
import { ethers } from 'ethers';
import { useModel } from 'umi';
import { request } from '../../../utils/request';
import CampaignAbi from '../Campaign.json';
import styles from '../index.less';

const { campaignId = '' } = location.search
  .substr(1)
  .split('&')
  .reduce((res, item) => {
    const parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
  }, {});
export default ({ contract = {}, signer = {}, data }) => {
  const { contractAddress } = data;
  const [checkButton, setCheckButton] = useState(false);
  const [campaignResult, setCampaignResult] = useState([]);
  const { getCurrentGasPrice } = useModel('global', (model) => ({
    getCurrentGasPrice: model.getCurrentGasPrice,
  }));

  const pushPay = async () => {
    const signerAddress = await signer.getAddress();
    const campaignAddressList = await contract.getCampaignAddressList(
      signerAddress,
    );
    const campaignIndex = campaignAddressList.findIndex(
      (l) => l === contractAddress,
    );
    const feeData = await getCurrentGasPrice();
    await contract.pushPayKol(
      signerAddress,
      campaignIndex + 1,
      campaignResult,
      {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      },
    );

    contract.once('Pushpay', (from, to, value) => {
      console.info(from, to, value);
      setCheckButton(true);
    });
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
        campaignId,
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

  console.info(campaignResult);
  return (
    <div className={styles.module}>
      <Table
        columns={[
          { title: 'KOL 钱包地址', dataIndex: 'kolAddress', key: 'kolAddress' },
          { title: '带来用户数', dataIndex: 'quantity', key: 'quantity' },
        ]}
        rowKey="kolAddress"
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
