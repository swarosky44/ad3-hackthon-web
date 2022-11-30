import { useState } from 'react';
import { Table, Modal, Descriptions } from 'antd';
import { ethers } from 'ethers';
import CampaignAbi from '../Campaign.json';
import styles from "../index.less";

const kolWithUsers = [
  {
    _address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    users: [
      '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
      '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    ],
  },
  {
    _address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    users: [
      '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
      '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
    ],
  },
];
export default ({ contract = {}, signer = {} }) => {
  const [checkButton, setCheckButton] = useState(false);

  const pushPay = async () => {
    const signerAddress = await signer.getAddress();
    const campaignAddressList = await contract.getCampaignAddressList(
      signerAddress,
    );
    await contract.pushPay(
      signerAddress,
      campaignAddressList.length,
      kolWithUsers,
      {
        gasLimit: 15000000,
        gasPrice: 10 * 10 ** 9,
      },
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

  return (
    <div className={styles.module}>
      <Table
        columns={[
          { title: 'KOL 钱包地址', dataIndex: '_address', key: '_address' },
          {
            title: '用户名单',
            key: 'users',
            render: record => {
              return record.users.map(u => (
                <p style={{ margin: '0 0 8px 0' }}>{u}</p>
              ));
            },
          },
        ]}
        rowKey="_address"
        dataSource={kolWithUsers}
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
