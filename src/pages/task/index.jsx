import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { CheckCircleOutlined } from '@ant-design/icons';
import LoginModal from './loginModal';
import TwitterAuthModal from './twitterAuthModal';
import { request } from '../../utils/request';
import styles from './index.less';
import { message } from 'antd';

const { campaignId = '', kolId = '' } = location.search
  .substr(1)
  .split('&')
  .reduce((res, item) => {
    const parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
  }, {});
export default () => {
  const [campaign, setCampaign] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [campaignInstance, setCampaignInstance] = useState(null);
  const [twitterAuthUrl, setTwitterAuthUrl] = useState('');
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const { ad3Account, queryTwitterAuth, queryAd3Account, connectWallet } =
    useModel('global', (model) => ({
      ad3Account: model.ad3Account,
      queryTwitterAuth: model.queryTwitterAuth,
      queryAd3Account: model.queryAd3Account,
      connectWallet: model.connectWallet,
    }));

  // 监听 storage twitter auth 事件
  const listenStorageEvent = () => {
    window.addEventListener('storage', async (e) => {
      await queryAd3Account();
      setTwitterAuthUrl('');
    });
  };

  // 获取任务详情
  const getTaskDetail = async () => {
    if (campaignId && kolId) {
      const ret = await request({
        method: 'GET',
        api: 'api/campaign/queryCampaign',
        params: {
          campaignId: +campaignId,
          kolId: +kolId,
        },
      });
      if (ret && ret.result) {
        setCampaign(ret.result.campaign);
        setTaskList(ret.result.taskInstanceList);
        setCampaignInstance(ret.result.campaignInstance);
      }
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
    if (ad3Account && ad3Account.address) {
      // 已登录 AD3 账号 && 未获取 twitter 授权
      const result = await queryTwitterAuth();
      if (result && result.result) {
        setTwitterAuthUrl(result.result);
      }
      return;
    } else if (!ad3Account || !ad3Account.address) {
      setLoginModalVisible(true);
      return;
    }

    // campaign 状态
    if (campaignInstance.status === 'pending') {
      message.warn('campaign is pending');
      return;
    } else if (campaignInstance.status === 'expired') {
      message.warn('campaign is expired');
      return;
    }

    // task 状态
    if (task.taskInstance.status === 'pending') {
      message.warn('campaign is pending');
      return;
    } else if (task.taskInstance.status === 'expired') {
      message.warn('campaign is pending');
      return;
    }
  };

  // 判断按钮使用状态
  const getBtnAvailableStatus = (task) => {
    if (!ad3Account || !ad3Account.address || !ad3Account.username)
      return false;
    if (!campaignInstance || campaignInstance.status !== 'running')
      return false;
    if (!task || task.taskInstance.status !== 'running') return false;
    return true;
  };

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
          {getBtnAvailableStatus(l) ? (
            <div className={styles.taskBtnGroup}>
              <div className={styles.actionBtn}>Follow</div>
              <div className={styles.verifyBtn}>Verify</div>
            </div>
          ) : (
            <div className={styles.taskBtn} onClick={() => onFinishedTask(l)}>
              GO
            </div>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    getTaskDetail();
    listenStorageEvent();
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
        {twitterAuthUrl ? (
          <TwitterAuthModal
            url={twitterAuthUrl}
            close={() => setTwitterAuthUrl('')}
          />
        ) : null}
        {loginModalVisible ? (
          <LoginModal close={() => setLoginModalVisible(false)} />
        ) : null}
      </div>
    );
  }

  return null;
};
