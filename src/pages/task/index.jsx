import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Spin } from 'antd';
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
  const [isLoading, setIsLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);
  const [reward, setReward] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [campaignInstance, setCampaignInstance] = useState(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const { ad3Account } = useModel('global', (model) => ({
    ad3Account: model.ad3Account,
  }));

  // 获取任务详情
  const getTaskDetail = async () => {
    const params = {
      campaignId: +campaignId,
      kolId: +kolId,
    };
    if (ad3Account && ad3Account.address) {
      params.address = ad3Account.address;
    }
    if (campaignId && kolId) {
      const ret = await request({
        method: 'GET',
        api: 'api/campaign/queryCampaign',
        params,
      });
      if (ret && ret.result) {
        setReward(ret.result.reward);
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
    // 登录状态检查
    if (!ad3Account || !ad3Account.address) {
      setLoginModalVisible(true);
      return;
    }

    // campaign 状态检查
    if (campaignInstance.status === 'pending') {
      message.warn('campaign is pending');
      return;
    } else if (campaignInstance.status === 'expired') {
      message.warn('campaign is expired');
      return;
    }

    // task 状态检查
    if (task.taskInstance.status === 'pending') {
      message.warn('campaign is pending');
      return;
    } else if (task.taskInstance.status === 'expired') {
      message.warn('campaign is pending');
      return;
    }

    // 执行任务
    const ret = await request({
      method: 'GET',
      api: 'api/campaign/finishTask',
      params: {
        address: ad3Account.address,
        kolId: +kolId,
        taskId: task.task.taskId,
      },
    });
    if (ret && `${ret.result}` === 'true') {
      getTaskDetail();
      window.open(task.task.actionObject);
    }
  };

  useEffect(() => {
    getTaskDetail();
  }, []);

  useEffect(() => {
    if (ad3Account && ad3Account.address) {
      getTaskDetail();
    }
  }, [ad3Account]);

  if (campaign && campaignInstance && taskList.length) {
    return (
      <div>
        <MobileContent
          reward={reward}
          campaign={campaign}
          campaignInstance={campaignInstance}
          taskList={taskList}
          formatTime={formatTime}
          onFinishedTask={onFinishedTask}
        />
        {loginModalVisible ? (
          <LoginModal close={() => setLoginModalVisible(false)} />
        ) : null}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '120px',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return null;
};
