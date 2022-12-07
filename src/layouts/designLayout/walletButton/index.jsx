import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { isMobile } from 'react-device-detect';
import styles from './index.less';

const STYLE_OPTIONS = {
  middle: {
    height: '48px',
    padding: '0 24px',
    lineHeight: '42px',
    borderRadius: '24px',
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
  const [walletDetailVisible, setWalletDetailVisible] = useState(false);
  const { connectWallet, resetWallet, account, hadInstallMetaMask } = useModel(
    'global',
    (model) => ({
      account: model.account,
      connectWallet: model.connectWallet,
      resetWallet: model.resetWallet,
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
    // if (hadInstallMetaMask && !account) {
    //   connectWallet();
    // }
  }, []);

  return hadInstallMetaMask ? (
    account && account[0] ? (
      <div
        className={styles.wallet}
        style={styleOption}
        onClick={() => setWalletDetailVisible(!walletDetailVisible)}
      >
        {formatAddress(account[0])}
        {walletDetailVisible ? (
          <div className={styles.logoutModal} onClick={resetWallet}>
            <img
              className={styles.logoutModalImg}
              src={require('@/static/logout-modal.png')}
            />
          </div>
        ) : null}
      </div>
    ) : (
      <div
        className={styles.wallet}
        style={styleOption}
        onClick={connectWallet}
      >
        Connect Wallet
      </div>
    )
  ) : (
    <div
      className={styles.wallet}
      style={styleOption}
      onClick={() => {
        window.open(
          isMobile
            ? `https://metamask.app.link/dapp/${location.host}${location.pathname}${location.search}`
            : 'https://metamask.io/download/',
          'install metamsk',
        );
      }}
    >
      Install MetaMask
    </div>
  );
};
