import { useModel, Link } from 'umi';
import { Tooltip } from 'antd';
import styles from './index.less';

export default () => {
  const { connectWallet, signer, provider, account, hadInstallMetaMask } =
    useModel('global', (model) => ({
      provider: model.provider,
      signer: model.signer,
      account: model.account,
      connectWallet: model.connectWallet,
      hadInstallMetaMask: model.hadInstallMetaMask,
    }));

  const formatAddress = (address) => {
    let result = '';
    if (address) {
      address.replace(/^(.{4})(.+)(.{4})$/gi, (str, $1, $2, $3) => {
        result = `${$1} **** ${$3}`;
      });
    }
    return result;
  };

  console.info(hadInstallMetaMask);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImage} src={require('@/static/logo.png')} />
        Adventure3
      </div>
      <div className={styles.menuGroup}>
        {[
          { name: 'Home', path: '/home' },
          { name: 'Adventure3', path: '/adventure3' },
          { name: 'Native Score', path: '/native' },
        ].map((m, i) => (
          <Link to={m.path} key={i} key={`menu-${i}`}>
            <span className={styles.menu}>{m.name}</span>
          </Link>
        ))}
        {hadInstallMetaMask ? (
          account && account[0] ? (
            <Tooltip placement="bottom" title={account[0]}>
              <span className={styles.account}>
                {formatAddress(account[0])}
              </span>
            </Tooltip>
          ) : (
            <div className={styles.wallet} onClick={connectWallet}>
              connect
            </div>
          )
        ) : (
          <div
            className={styles.wallet}
            onClick={() => {
              window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', 'install metamsk');
            }}
          >
            Install MetaMask
          </div>
        )}
      </div>
    </div>
  );
};
