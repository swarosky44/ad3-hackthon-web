import { useEffect } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

export default ({ url = '', close = () => {} }) => {
  const { connectWallet, account, hadInstallMetaMask } = useModel(
    'global',
    (model) => ({
      hadInstallMetaMask: model.hadInstallMetaMask,
      connectWallet: model.connectWallet,
      account: model.account,
    }),
  );

  useEffect(() => {
    document.body.style = 'overflow:hidden;';
    return () => {
      document.body.style = 'overflow:scroll';
    };
  }, []);

  useEffect(() => {
    if (account && account[0]) {
      close();
    }
  }, [account]);

  return (
    <div className={styles.modal}>
      <div className={styles.mask} onClick={close} />
      <div className={styles.content}>
        <div className={styles.title}>Connect your wallet</div>
        <div className={styles.desc}>
          Please connect wallet first so that you can participate into the
          campaign.
        </div>
        {hadInstallMetaMask ? (
          <div className={styles.btn} onClick={connectWallet}>
            <img
              className={styles.metamaskIcon}
              src={require('@/static/metamask-icon.png')}
            />
            Connect MetaMask
          </div>
        ) : (
          <div
            className={styles.btn}
            onClick={() => {
              window.open(
                isMobile
                  ? `https://metamask.app.link/dapp/${location.host}${location.pathname}${location.search}`
                  : 'https://metamask.io/download/',
                'install metamsk',
              );
            }}
          >
            <img
              className={styles.metamaskIcon}
              src={require('@/static/metamask-icon.png')}
            />
            Install MetaMask
          </div>
        )}
      </div>
    </div>
  );
};
