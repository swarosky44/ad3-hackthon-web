import { useEffect, useState } from 'react';
import { List, message } from 'antd';
import { useModel } from 'umi';
import TwitterAuthModal from './twitterAuthModal';
import { request } from '../../utils/request';
import { TASK_STATUS_MAP } from '../../utils/const';

import styles from './index.less';

export default () => {
  const [campaign, setCampaign] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [campaignStatus, setCampaignStatus] = useState(TASK_STATUS_MAP[0]);
  const [twitterAuthUrl, setTwitterAuthUrl] = useState('');
  const { ad3Account, queryTwitterAuth } = useModel('global', (model) => ({
    ad3Account: model.ad3Account,
    queryTwitterAuth: model.queryTwitterAuth,
  }));

  // 获取任务详情
  const getTaskDetail = async () => {
    const ret = await request({
      method: 'GET',
      api: 'api/campaign/queryCampaign',
      params: {
        campaignId: 2,
      },
    });
    if (ret && ret.result) {
      setCampaign(ret.result.campaign);
      setTaskList(ret.result.taskInstanceList);
      setCampaignStatus(ret.result.campaignStatus);
    }
  };

  // 格式化时间
  const formatTime = (time) => {
    const date = new Date(time);
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();

    return `${Y}-${M >= 10 ? M : `0${M}`}-${D >= 10 ? D : `0${D}`}`;
  };

  // 完成任务
  const onFinishedTask = async () => {
    // 已登录 AD3 账号 && 已获取 twitter 授权
    if (ad3Account && ad3Account.address && ad3Account.username) {
      // TODO
    } else if (ad3Account && ad3Account.address) {
      // 已登录 AD3 账号 && 未获取 twitter 授权
      const result = await queryTwitterAuth();
      if (result && result.result) {
        setTwitterAuthUrl(result.result);
      }
    } else {
      message.warn('Please connect wallet first');
    }
  };

  // 渲染列表
  const renderList = () => {
    if (taskList.length <= 3) {
      return taskList.map((l, i) => (
        <div className={styles.taskLine} onClick={onFinishedTask}>
          <div className={styles.taskContent}>
            <div className={styles.taskTitle}>TASK{i + 1}</div>
            <div className={styles.taskDesc}>{l.task.action.actionDetail}</div>
          </div>
          <div className={styles.taskBtn}>FOLLOW</div>
        </div>
      ));
    } else if (taskList.length <= 4) {
      return (
        <div className={styles.listWrap}>
          <List
            grid={{
              gutter: 16,
              column: 2,
            }}
            dataSource={taskList}
            renderItem={(l, i) => (
              <List.Item>
                <div className={styles.taskCard} onClick={onFinishedTask}>
                  <div className={styles.taskContent}>
                    <div className={styles.taskTitle}>TASK{i + 1}</div>
                    <div className={styles.taskDesc}>
                      {l.task.action.actionDetail}
                    </div>
                  </div>
                  <div className={styles.taskBtn}>FOLLOW</div>
                </div>
              </List.Item>
            )}
          />
        </div>
      );
    } else if (taskList.length > 4) {
      return (
        <div className={styles.listWrap}>
          <List
            grid={{
              gutter: 16,
              column: 3,
            }}
            dataSource={taskList}
            renderItem={(l, i) => (
              <List.Item>
                <div className={styles.taskCard} onClick={onFinishedTask}>
                  <div className={styles.taskContent}>
                    <div className={styles.taskTitle}>TASK{i + 1}</div>
                    <div className={styles.taskDesc}>
                      {l.task.action.actionDetail}
                    </div>
                  </div>
                  <div className={styles.taskBtn}>FOLLOW</div>
                </div>
              </List.Item>
            )}
          />
        </div>
      );
    }
  };

  useEffect(() => {
    getTaskDetail();
  }, []);

  if (campaign) {
    return (
      <div className={styles.module}>
        <div className={styles.header}>
          <img
            className={styles.bgImage}
            src={require('@/static/task-top-bg.png')}
          />
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              {campaign.campaignName} {campaign.projectName}
            </h1>
            <h1 className={styles.reward}>{campaign.reward.rewardText}</h1>
            <p className={styles.timeline}>
              from 〔{formatTime(campaign.startTime)}〕 to 〔
              {formatTime(campaign.endTime)}〕
            </p>
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
              src={require('@/static/task-banner-grass.png')}
            />
            <img
              className={styles.bannerCoin}
              src={require('@/static/task-banner-coin.png')}
            />
          </div>
        </div>
        <div className={styles.list}>
          <img
            className={styles.star}
            src={require('@/static/task-list-star.png')}
          />
          <img
            className={styles.squar}
            src={require('@/static/task-list-blue.png')}
          />
          <div className={styles.listContent}>{renderList()}</div>
        </div>
        <div className={styles.footer}>
          <p className={styles.sponsorTip}>
            T&C，The final interpretation of this activity belongs to (Project
            Name).T&C, the final interpretation of this activity belongs to
            (Project Name).
          </p>
        </div>
        {twitterAuthUrl ? (
          <TwitterAuthModal
            url={twitterAuthUrl}
            close={() => setTwitterAuthUrl('')}
          />
        ) : null}
      </div>
    );
  }

  return null;
};
