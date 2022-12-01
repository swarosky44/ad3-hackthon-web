import { useEffect } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

export default ({ url = '', close = () => {} }) => {
  const { connectWallet, account } = useModel('global', (model) => ({
    connectWallet: model.connectWallet,
    account: model.account,
  }));

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
        <div className={styles.btn} onClick={connectWallet}>
          <img
            className={styles.metamaskIcon}
            src={require('@/static/metamask-icon.png')}
          />
          Connect MetaMask
        </div>
      </div>
    </div>
  );
};
