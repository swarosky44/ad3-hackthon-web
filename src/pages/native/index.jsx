import styles from './index.less';

export default () => {
  return (
    <div className={styles.module}>
      <img
        className={styles.comingSoon}
        src={require('@/static/coming-soon.png')}
      />
      <h1 className={styles.title}>
        Coming Soon！
      </h1>
      <h1
        className={styles.title}
        style={{ marginBottom: '100px' }}
      >
        The function is under development, please stay tuned
      </h1>
    </div>
  );
};
