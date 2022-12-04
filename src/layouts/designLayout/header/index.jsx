import { isMobile } from 'react-device-detect';
import WalletButton from '@/components/walletButton';
import styles from './index.less';

export default () => {
  if (isMobile) {
    return (
      <div className={styles.mobileHeader}>
        <img className={styles.logo} src={require('@/static/ad3-logo.png')} />
        <div className={styles.menuGroup}>
          <WalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <div className={styles.menuGroup}>
        <WalletButton />
      </div>
    </div>
  );
};
