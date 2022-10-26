import { useModel } from 'umi';
import { Spin } from 'antd';
import UnConnect from './components/unConnect';
import Profile from './components/profile';
import styles from './index.less';

export default () => {
  const { account, userScore, userPowt } = useModel(
    'global',
    (model) => ({
      account: model.account,
      userScore: model.userScore,
      userPowt: model.userPowt,
    }),
  );

  return (
    <div className={styles.module}>
      {account && account[0]
        ? userScore
          ? <Profile />
          : <Spin size="large" />
        : <UnConnect />
      }
    </div>
  );
};
