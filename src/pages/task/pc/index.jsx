import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

export default ({
  campaign = {},
  taskList = [],
  formatTime = () => {},
  onFinishedTask = () => {},
}) => {
  // 渲染列表
  const renderList = () => {
    return taskList.map((l, i) => {
      if (l.taskInstance.status === 'finish') {
        return (
          <div className={styles.finishedTaskLine}>
            <div className={styles.taskContent}>
              <div className={styles.taskTitle}>{l.task.name}</div>
              <div className={styles.taskDesc}>{l.task.desc}</div>
            </div>
            <CheckCircleOutlined
              style={{ fontSize: '48px', color: '#CDF590' }}
            />
          </div>
        );
      }

      return (
        <div className={styles.taskLine}>
          <div className={styles.taskContent}>
            <div className={styles.taskTitle}>{l.task.name}</div>
            <div className={styles.taskDesc}>{l.task.desc}</div>
          </div>
          <div className={styles.taskBtn} onClick={() => onFinishedTask(l)}>
            GO
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.module}>
      <div className={styles.header}>
        <img
          className={styles.bgImage}
          src={require('@/static/task-top-bg.png')}
        />
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{campaign.campaignName}</h1>
          {/* <h1 className={styles.reward}>{campaign.reward.rewardText}</h1> */}
          <p className={styles.timeline}>
            from 〔{formatTime(campaign.startTime)}〕 to 〔
            {formatTime(campaign.endTime)}〕
          </p>
        </div>
      </div>
      {/* <div className={styles.banner}>
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
            src={require('@/static/task-banner-grass.png')}
          />
          <img
            className={styles.bannerCoin}
            src={require('@/static/task-banner-coin.png')}
          />
        </div>
      </div> */}
      <div className={styles.list}>
        <div className={styles.listContent}>{renderList()}</div>
      </div>
      <div className={styles.footer}>
        <p className={styles.sponsorTip}>
          T&C，The final interpretation of this activity belongs to{' '}
          {campaign.campaignName}
        </p>
      </div>
    </div>
  );
};
