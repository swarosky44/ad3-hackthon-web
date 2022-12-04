import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { isMobile } from 'react-device-detect';
import PcContent from './pc';
import MobileContent from './mobile';
import LoginModal from './loginModal';
import { request } from '../../utils/request';
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
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const { ad3Account } = useModel('global', (model) => ({
    ad3Account: model.ad3Account,
  }));

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
  const onFinishedTask = async (task) => {
    if (!ad3Account || !ad3Account.address) {
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

  useEffect(() => {
    getTaskDetail();
  }, []);

  if (campaign && campaignInstance && taskList.length) {
    return (
      <div>
        {isMobile ? (
          <MobileContent
            campaign={campaign}
            campaignInstance={campaignInstance}
            taskList={taskList}
            formatTime={formatTime}
            onFinishedTask={onFinishedTask}
          />
        ) : (
          <PcContent
            campaign={campaign}
            taskList={taskList}
            formatTime={formatTime}
            onFinishedTask={onFinishedTask}
          />
        )}
        {loginModalVisible ? (
          <LoginModal close={() => setLoginModalVisible(false)} />
        ) : null}
      </div>
    );
  }

  return null;
};
