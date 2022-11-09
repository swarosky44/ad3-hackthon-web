import styles from "./index.less";

export default () => {
  return (
    <div className={styles.module}>
      <div className={styles.header}>
        <img
          className={styles.bgImage}
          src={require("@/static/task-top-bg.png")}
        />
        <div className={styles.headerContent}>
          <h1 className={styles.title}>PROJECT NAME CAMPAIGN NAME</h1>
          <h1 className={styles.reward}>REWARD</h1>
          <p className={styles.timeline}>from〔startAt〕to〔endAt〕</p>
        </div>
      </div>
      <div className={styles.banner}>
        <div className={styles.contentWrap}>
          <div className={styles.content}>
            <div className={styles.avatarList}>
              {[1, 1, 1].map((av, i) => (
                <div
                  className={styles.avatar}
                  style={{ left: `${i * 54}px` }}
                />
              ))}
            </div>
            <div className={styles.tip}>
              xxx users completed & obtained the rewards
            </div>
          </div>
          <img
            className={styles.bannerGrass}
            src={require("@/static/task-banner-grass.png")}
          />
          <img
            className={styles.bannerCoin}
            src={require("@/static/task-banner-coin.png")}
          />
        </div>
      </div>
      <div className={styles.list}>
        <img
          className={styles.star}
          src={require("@/static/task-list-star.png")}
        />
        <img
          className={styles.squar}
          src={require("@/static/task-list-blue.png")}
        />
      </div>
      <div className={styles.footer}>
        <p className={styles.sponsorTip}>
          T&C，The final interpretation of this activity belongs to (Project Name).T&C, the final interpretation of this activity belongs to (Project Name).
        </p>
      </div>
    </div>
  )
}
