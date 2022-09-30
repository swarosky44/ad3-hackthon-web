import { Link } from 'umi';
import WalletButton from '@/components/walletButton';
import styles from './index.less';

export default () => {

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
          <Link to={m.path} key={i}>
            <span className={styles.menu}>{m.name}</span>
          </Link>
        ))}
        <WalletButton />
      </div>
    </div>
  );
};
