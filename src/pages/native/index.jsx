import { useModel } from 'umi';
import UnConnect from './components/unConnect';
import Profile from './components/profile';
import styles from './index.less';

export default () => {
  const { account } = useModel(
    'global',
    (model) => ({
      account: model.account,
    }),
  );
  return (
    <div className={styles.module}>
      {account && account[0] ? (
        <Profile />
      ) : (
        <UnConnect />
      )}
    </div>
  );
};
