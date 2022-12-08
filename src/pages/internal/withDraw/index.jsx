import { useState } from 'react';
import { Modal, Descriptions } from 'antd';
import { ethers } from 'ethers';
import { useModel } from 'umi';
import { LoadingOutlined } from '@ant-design/icons';
import CampaignAbi from '../Campaign.json';
import styles from '../index.less';

export default ({ contract = {}, signer = {}, data = {} }) => {
  const { contractAddress } = data;
  const [checkButton, setCheckButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getCurrentGasPrice } = useModel('global', (model) => ({
    getCurrentGasPrice: model.getCurrentGasPrice,
  }));

  const withDraw = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const signerAddress = await signer.getAddress();
      const campaignAddressList = await contract.getCampaignAddressList(
        signerAddress,
      );
      const campaignIndex = campaignAddressList.findIndex(
        (l) => l === contractAddress,
      );
      const feeData = await getCurrentGasPrice();
      await contract.withdraw(signerAddress, campaignIndex + 1, {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      });

      contract.once('Withdraw', (from, to, value) => {
        console.info(from, to, value);
        setCheckButton(true);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      Modal.warn({
        title: '退款失败',
        content: JSON.stringify(error),
      });
    }
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

  return loading ? (
    <div className={styles.button}>
      <LoadingOutlined style={{ marginRight: '8px' }} /> 耐心等待，链上很慢
    </div>
  ) : checkButton ? (
    <div className={styles.button} onClick={checkBalance}>
      查询合约余额
    </div>
  ) : (
    <div className={styles.button} onClick={withDraw}>
      退款
    </div>
  );
};
