import Header from "./header";
import styles from "./index.less";
import 'antd/dist/antd.css';

export default ({ location, children }) => {
  console.info(location);
  return (
    <div className={styles.module}>
      <Header />
      <div className={styles.body}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
