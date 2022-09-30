import { useState } from "react";
import { notification } from "antd";
import CircleProcess from "@/components/circleProcess";
import Dashboard from "./dashboard";
import styles from "./profile.less";

export default () => {
  const [notificationVisible, setNotificationVisible] = useState(false);

  return (
    <div className={styles.module}>
      <h1 className={styles.title}>
        <span className={styles.titleText}>Check Your AD3 Score</span>
        <img
          className={styles.titleRobotImage}
          src={require("@/static/mini-robot.png")}
        />
      </h1>
      <div className={styles.content}>
        <div className={styles.main}>
          <img
            className={styles.backgroundImage}
            src={require("@/static/profile-background.png")}
          />
          <div
            className={styles.process}
            onMouseEnter={() => {
              if (!notificationVisible) {
                setNotificationVisible(true);
                notification.open({
                  message: "",
                  description: "According to the contribution of on-chain behavior to Web3, it is divided into 8 grades, from low to high: N (none), I (low), M- (moderately low), M (moderate), M+ (moderate  plus) , E (excellent), E+ (excellent plus), O (outstanding)",
                  className: "custom-notification",
                  onClose: () => setNotificationVisible(false),
                })
              }
            }}
          >
            <CircleProcess>
              <div className={styles.processNumber}>
                <span className={styles.processAmount}>85.12</span>
                <div className={styles.processLevel}>
                  E
                  <img
                    className={styles.tipImage}
                    src={require("@/static/tip-image.png")}
                  />
                </div>
              </div>
            </CircleProcess>
          </div>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.dashboardTitle}>
            <img
              className={styles.dashboardTitleImage}
              src={require("@/static/dashboard-dot.png")}
            />
            Your AD3 Score
          </div>
          <Dashboard />
        </div>
      </div>
      <div className={styles.list}>
        <h1 className={styles.listTitle}>Check Your PoW Token</h1>
        <div className={styles.card}>
          
        </div>
      </div>
    </div>
  );
}
