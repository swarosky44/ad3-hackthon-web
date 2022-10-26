import { useEffect } from 'react';
import { useModel } from 'umi';
import { Tooltip } from 'antd';
import styles from './index.less';

const STYLE_OPTIONS = {
  middle: {
    height: '24px',
    padding: '0 24px',
    lineHeight: '21px',
    borderRadius: '12px',
    fontSize: '16px',
  },
  large: {
    height: '48px',
    padding: '0 32px',
    lineHeight: '44px',
    borderRadius: '24px',
    fontSize: '32px',
  },
};
export default ({ size = 'middle' }) => {
  const styleOption = STYLE_OPTIONS[size];
  const { connectWallet, account, hadInstallMetaMask } = useModel(
    'global',
    (model) => ({
      account: model.account,
      connectWallet: model.connectWallet,
      hadInstallMetaMask: model.hadInstallMetaMask,
    }),
  );

  const formatAddress = (address) => {
    let result = '';
    if (address) {
      address.replace(/^(.{4})(.+)(.{4})$/gi, (str, $1, $2, $3) => {
        result = `${$1} **** ${$3}`;
      });
    }
    return result;
  };

  useEffect(() => {
    if (hadInstallMetaMask && !account) {
      connectWallet();
    }
  }, []);

  return hadInstallMetaMask ? (
    account && account[0] ? (
      <Tooltip placement="bottom" title={account[0]}>
        <span className={styles.account}>{formatAddress(account[0])}</span>
      </Tooltip>
    ) : (
      <div
        className={styles.wallet}
        style={styleOption}
        onClick={connectWallet}
      >
        connect
      </div>
    )
  ) : (
    <div
      className={styles.wallet}
      style={styleOption}
      onClick={() => {
        window.open('https://metamask.io/', 'install metamsk');
      }}
    >
      Install MetaMask
    </div>
  );
};