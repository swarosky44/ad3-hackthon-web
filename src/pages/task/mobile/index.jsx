import { useState, useEffect } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

let interval = null;
const utcDateFormat = (date) => {
  const d = new Date(date);
  const utcD = Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds(),
  );
  return new Date(utcD).getTime();
};
export default ({
  reward = {},
  campaign = {},
  campaignInstance = {},
  taskList = [],
  onFinishedTask = () => {},
}) => {
  const [countdown, setCountdown] = useState(
    new Date(utcDateFormat(campaign.endTime.replace(/-/gi, '/'))) -
      utcDateFormat(new Date()),
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
    return (
      <img
        className={styles.taskIcon}
        src={require('@/static/online-voting.png')}
      />
    );
  };

  // 渲染列表
  const renderList = () => {
    return taskList.map((l, i) => {
      if (l.taskInstance.status === 'finish') {
        return (
          <div className={styles.taskLine} key={i}>
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
            <div className={styles.taskTitle}>
              {l.task.name}
              {l.task.name.indexOf('Vote') >= 0 ? (
                <div className={styles.taskTip}>
                  Please visit MOOAR on desktop.
                </div>
              ) : null}
            </div>
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
      <div className={styles.cover}>
        <img
          className={styles.coverImage}
          src={require('@/static/magic-pop-cover.jpeg')}
        />
      </div>
      {renderCountdown()}
      <div className={styles.list}>{renderList()}</div>
      <div className={styles.description}>
        <h1 className={styles.descTitle}>Description</h1>
        <img
          style={{ width: '100%', height: 'auto' }}
          src={require('@/static/magic-pop-desc-1.jpeg')}
        />
        <img
          style={{ width: '100%', height: 'auto', maginTop: '8px' }}
          src={require('@/static/magic-pop-desc-2.jpeg')}
        />
      </div>
      {/* <div className={styles.reward}>
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
      </div> */}
    </div>
  );
};
