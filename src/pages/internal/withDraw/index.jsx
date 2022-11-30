import { useState } from 'react';
import { Modal, Descriptions } from 'antd';
import { ethers } from 'ethers';
import CampaignAbi from '../Campaign.json';
import styles from "../index.less";

export default ({ contract = {}, signer = {} }) => {
  const [checkButton, setCheckButton] = useState(false);

  const withDraw = async () => {
    const signerAddress = await signer.getAddress();
    const campaignAddressList = await contract.getCampaignAddressList(
      signerAddress,
    );
    await contract.withdraw(
      signerAddress,
      campaignAddressList.length,
    );
    setCheckButton(true);
  };

  const checkBalance = async () => {
    const signerAddress = await signer.getAddress();
    const campaignAddressList = await contract.getCampaignAddressList(
      signerAddress,
    );
    const campaignAddress = await contract.getCampaignAddress(
      signerAddress,
      campaignAddressList.length,
    );
    const Campaign = new ethers.Contract(campaignAddress, CampaignAbi, signer);
    const balance = await Campaign.remainBalance();
    Modal.success({
      title: '查询合约',
      content: (
        <Descriptions title="合约信息" column={1} bordered>
          <Descriptions.Item label="合约资金">{balance.toNumber()}</Descriptions.Item>
        </Descriptions>
      )
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
