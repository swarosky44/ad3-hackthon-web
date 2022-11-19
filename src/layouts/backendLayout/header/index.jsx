import styles from "./index.less";
import WalletButton from "@/components/walletButton";

export default () => {
  return (
    <div className={styles.module}>
      <div className={styles.content}>
        <img
          className={styles.logo}
          src={require("@/static/backendLogo.png")}
        />
        <div className={styles.wallet}>
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
