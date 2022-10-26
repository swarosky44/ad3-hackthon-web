import { useState, useMemo } from "react";
import { List } from "antd";
import { useModel } from 'umi';
import CircleProcess from "@/components/circleProcess";
import Dashboard from "./dashboard";
import styles from "./profile.less";

export default () => {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const { userScore, userPowt } = useModel(
    'global',
    (model) => ({
      userScore: model.userScore,
      userPowt: model.userPowt,
    }),
  );

  console.info(userPowt);

  const listMap = useMemo(() => {
    const result = {
      sbtList: [],
      poapList: [],
      oatList: [],
    };
    if (userPowt.length) {
      for (let i = 0; i < userPowt.length; i += 1) {
        const powt = userPowt[i];
        powt.tokenType === 'SBT' && result.sbtList.push(powt);
        powt.tokenType === 'POAP' && result.poapList.push(powt);
        powt.tokenType === 'OAT' && result.oatList.push(powt);
      }
    }
    return result;
  }, [userPowt]);

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
              // if (!notificationVisible) {
              //   setNotificationVisible(true);
              //   notification.open({
              //     message: "",
              //     description: "According to the contribution of on-chain behavior to Web3, it is divided into 8 grades, from low to high: N (none), I (low), M- (moderately low), M (moderate), M+ (moderate  plus) , E (excellent), E+ (excellent plus), O (outstanding)",
              //     className: "custom-notification",
              //     onClose: () => setNotificationVisible(false),
              //   })
              // }
            }}
          >
            <CircleProcess score={userScore.nativeScore}>
              <div className={styles.processNumber}>
                <span className={styles.processAmount}>{userScore.nativeScore}</span>
                <div className={styles.processLevel}>
                  {userScore.buidlScore}
                </div>
              </div>
            </CircleProcess>
          </div>
        </div>
        {/* <div className={styles.dashboard}>
          <div className={styles.dashboardTitle}>
            <img
              className={styles.dashboardTitleImage}
              src={require("@/static/dashboard-dot.png")}
            />
            Your AD3 Score
          </div>
          <Dashboard />
        </div> */}
      </div>
      <div className={styles.listModule}>
        <h1 className={styles.listTitle}>Check Your PoW Token</h1>
        {listMap.sbtList.length ? (
          <div
            className={styles.listCard}
            style={{ backgroundColor: '#000F32' }}
          >
            <h2
              className={styles.listCardTitle}
              style={{ color: '#4965FC' }}
            >
              SBT
            </h2>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={listMap.sbtList}
              renderItem={(item) => (
                <List.Item>
                  <div
                    className={styles.card}
                    style={{ backgroundImage: `url(${require('@/static/sbt-card.png')})` }}
                  >
                    <h4 className={styles.cardTitle}>{item.tokenName}</h4>
                    <div className={styles.time}>{item.createDateTime}</div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : null}
        {listMap.poapList.length ? (
          <div
            className={styles.listCard}
            style={{ backgroundColor: '#341E23' }}
          >
            <h2
              className={styles.listCardTitle}
              style={{ color: '#FF6AA8' }}
            >
              POAP
            </h2>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={listMap.poapList}
              renderItem={(item) => (
                <List.Item>
                  <div
                    className={styles.card}
                    style={{ backgroundImage: `url(${require('@/static/poap-card.png')})` }}
                  >
                    <h4 className={styles.cardTitle}>{item.tokenName}</h4>
                    <div className={styles.time}>{item.createDateTime}</div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : null}
        {listMap.oatList.length ? (
          <div
            className={styles.listCard}
            style={{ backgroundColor: '#360449' }}
          >
            <h2
              className={styles.listCardTitle}
              style={{ color: '#C676E2' }}
            >
              OAT
            </h2>
            <List
              style={{ width: '100%' }}
              grid={{
                gutter: 24,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              dataSource={listMap.oatList}
              renderItem={(item) => (
                <List.Item>
                  <div
                    className={styles.card}
                    style={{ backgroundImage: `url(${require('@/static/oat-card.png')})` }}
                  >
                    <h4 className={styles.cardTitle}>{item.tokenName}</h4>
                    <div className={styles.time}>{item.createDateTime}</div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
