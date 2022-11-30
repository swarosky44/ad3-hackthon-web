import styles from "./index.less";

export default ({ location, children }) => {
  console.info(location);
  return (
    <div className={styles.module}>
      {children}
    </div>
  );
}
