import InternalLayout from './internalLayout';
import DesignLayout from './designLayout';
import styles from './index.less';
import 'antd/dist/antd.css';

export default ({ children, ...props }) => {
  const { pathname } = location;

  if (pathname === '/internal') {
    return (
      <div className={styles.page}>
        <InternalLayout {...props}>{children}</InternalLayout>
      </div>
    );
  }

  if (pathname === '/task') {
    return (
      <div className={styles.page}>
        <DesignLayout {...props}>{children}</DesignLayout>
      </div>
    );
  }

  if (pathname === '/auth') {
    return <div className={styles.page}>{children}</div>;
  }

  return null;
};
