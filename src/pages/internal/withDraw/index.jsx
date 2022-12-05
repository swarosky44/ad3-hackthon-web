import { useState } from 'react';
import { Modal, Descriptions } from 'antd';
import { ethers } from 'ethers';
import CampaignAbi from '../Campaign.json';
import styles from '../index.less';

export default ({ contract = {}, signer = {} }) => {
  const { contractAddress } = data;
  const [checkButton, setCheckButton] = useState(false);
  console.info(contractAddress);

  const withDraw = async () => {
    const signerAddress = await signer.getAddress();
    const campaignAddressList = await contract.getCampaignAddressList(
      signerAddress,
    );
    const campaignIndex = campaignAddressList.findIndex(
      (l) => l === contractAddress,
    );
    await contract.withdraw(signerAddress, campaignIndex + 1);
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

  return checkButton ? (
    <div className={styles.button} onClick={checkBalance}>
      查询合约余额
    </div>
  ) : (
    <div className={styles.button} onClick={withDraw}>
      退款
    </div>
  );
};
