import { useState, useEffect } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

let interval = null;
export default ({
  reward = {},
  campaign = {},
  campaignInstance = {},
  taskList = [],
  onFinishedTask = () => {},
}) => {
  const [countdown, setCountdown] = useState(
    new Date(campaign.endTime.replace(/-/gi, '/')).getTime() - Date.now(),
  );

  useEffect(() => {
    interval = setInterval(() => {
      setCountdown((v) => {
        if (v > 1000) {
          return v - 1000;
        }
        return v;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
      interval = null;
    };
  }, []);

  // 渲染倒计时
  const renderCountdown = () => {
    const D = Math.floor(countdown / (24 * 60 * 60 * 1000));
    const H = Math.floor(
      (countdown - D * 24 * 60 * 60 * 1000) / (60 * 60 * 1000),
    );
    const m = Math.floor(
      (countdown - D * 24 * 60 * 60 * 1000 - H * 60 * 60 * 1000) / (60 * 1000),
    );
    const s = Math.floor(
      (countdown -
        D * 24 * 60 * 60 * 1000 -
        H * 60 * 60 * 1000 -
        m * 60 * 1000) /
        1000,
    );

    return (
      <div className={styles.countdownWrap}>
        <h2 className={styles.countdownTitle}>End of distance:</h2>
        <div className={styles.countdown}>
          <div className={styles.countdownBlock}>
            <span className={styles.countdownV}>{D >= 10 ? D : `0${D}`}</span>
            <span className={styles.countdownU}>Days</span>
          </div>
          <div className={styles.countdownBlock}>
            <span className={styles.countdownV}>{H >= 10 ? H : `0${H}`}</span>
            <span className={styles.countdownU}>Hours</span>
          </div>
          <div className={styles.countdownBlock}>
            <span className={styles.countdownV}>{m >= 10 ? m : `0${m}`}</span>
            <span className={styles.countdownU}>Minutes</span>
          </div>
          <div className={styles.countdownBlock}>
            <span className={styles.countdownV}>{s >= 10 ? s : `0${s}`}</span>
            <span className={styles.countdownU}>Seconds</span>
          </div>
        </div>
      </div>
    );
  };

  // 渲染任务图标
  const renderTaskIcon = ({ task }) => {
    if (task.channel === 'TWITTER') {
      return (
        <img
          className={styles.taskIcon}
          src={require('@/static/twitter-logo.png')}
        />
      );
    }
    return null;
  };

  // 渲染列表
  const renderList = () => {
    return taskList.map((l, i) => {
      if (l.taskInstance.status === 'finish') {
        return (
          <div className={styles.taskLine}>
            <div className={styles.taskContent}>
              {renderTaskIcon(l)}
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
            {renderTaskIcon(l)}
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
      {renderCountdown()}
      <div className={styles.list}>{renderList()}</div>
      <div className={styles.description}>
        <h1 className={styles.descTitle}>Description</h1>
        <h3 className={styles.descQ}>What is the Benefit of NFT ?</h3>
        <p className={styles.descA}>
          creators wonderland. A révolution movement to kick Hollywood's ass
          off. We co-create, own, and monetize IPs in a web3 way.{' '}
        </p>
        <h3 className={styles.descQ}>What is the Benefit of NFT ?</h3>
        <ul>
          <li className={styles.descA}>NFT Holder Benefits</li>
        </ul>
      </div>
      <div className={styles.reward}>
        <h1 className={styles.rewardTitle}>Reward</h1>
        <div className={styles.rewardContent}>
          <div className={styles.rewardInfo}>
            <div className={styles.rewardType}>{reward.type}</div>
            <div className={styles.rewardMain}>
              <img
                className={styles.rewardTokenIcon}
                src={require('@/static/tether-seeklogo.com.svg')}
              />
              <span style={{ margin: '0 0 0 4px' }}>{reward.winnersNum}</span>
              <span style={{ margin: '0 0 0 4px' }}>{reward.unit}</span>
            </div>
          </div>
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
