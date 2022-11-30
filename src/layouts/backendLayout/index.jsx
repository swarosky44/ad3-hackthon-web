import Header from './header';
import Nav from './nav';
import styles from './index.less';

export default ({ location, children }) => {
  return (
    <div className={styles.module}>
      <Header />
      <div className={styles.body}>
        <Nav location={location} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
