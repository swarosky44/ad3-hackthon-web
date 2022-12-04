import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

export default ({
  campaign = {},
  campaignInstance = {},
  taskList = [],
  onFinishedTask = () => {},
}) => {
  // 渲染列表
  const renderList = () => {
    return taskList.map((l, i) => {
      if (l.taskInstance.status !== 'finish') {
        return (
          <div className={styles.taskLine}>
            <div className={styles.taskContent}>
              <div className={styles.taskTitle}>{l.task.name}</div>
              <CheckCircleOutlined
                style={{ fontSize: '24px', color: '#CDF590' }}
              />
            </div>
            <span
              className={styles.boxShadow}
              style={{ background: '#caff04' }}
            />
          </div>
        );
      }

      return (
        <div className={styles.taskLine} onClick={() => onFinishedTask(l)}>
          <div className={styles.taskContent}>
            <div className={styles.taskTitle}>{l.task.name}</div>
          </div>
          <span className={styles.boxShadow} />
        </div>
      );
    });
  };

  return (
    <div className={styles.module}>
      <h1 className={styles.title}>{campaign.campaignName}</h1>
      <div className={styles.tags}>
        <div className={styles.tag}>{campaignInstance.status}</div>
        <div className={styles.tag}>
          {campaign.startTime} ~ {campaign.endTime}
        </div>
      </div>
      <div className={styles.list}>{renderList()}</div>
      <div className={styles.reward}>
        <h1 className={styles.rewardTitle}>Reward</h1>
        <div className={styles.rewardContent}>
          TODO
          <div className={styles.rewardTip}>
            <div className={styles.tipLine}>
              <img
                className={styles.gasIcon}
                src={require('@/static/polygon.png')}
              />
              Rewards on Polygon Chain
            </div>
            <div className={styles.tipLine}>
              <img
                className={styles.gasIcon}
                src={require('@/static/gas-less.svg')}
              />
              Claiming gas fee is covered by Ad3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
