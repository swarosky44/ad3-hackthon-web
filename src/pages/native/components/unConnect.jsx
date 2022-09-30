import WalletButton from "@/components/walletButton";
import CircleProcess from "@/components/circleProcess";
import styles from "../index.less";

export default () => {
  return (
    <>
      <h1 className={styles.title}>
        <WalletButton size="large" />
        <span className={styles.titleText}>to check your AD3 score</span>
        <img
          className={styles.titleRobotImage}
          src={require("@/static/mini-robot.png")}
        />
      </h1>
      <div className={styles.content}>
        <img
          className={styles.robotGirlImage}
          src={require("@/static/robot-girl.png")}
        />
        <CircleProcess>
          <span className={styles.unKownText}>? ? ?</span>
        </CircleProcess>
      </div>
      <div className={styles.desc}>
        <h1 className={styles.descText}>And also check your PoW Token</h1>
        <img
          className={styles.profileDemoImage}
          src={require("@/static/profile-demo.png")}
        />
      </div>
    </>
  );
}
