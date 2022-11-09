import { useEffect } from 'react';
import { Link } from 'umi';
import Header from './header';
import styles from './index.less';
import 'antd/dist/antd.css';

export default (props) => {
  useEffect(() => {}, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};
