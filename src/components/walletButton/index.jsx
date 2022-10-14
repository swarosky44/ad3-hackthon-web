import { useModel } from 'umi';
import { Tooltip } from 'antd';
import styles from './index.less';
import { useMemo } from 'react';

const STYLE_OPTIONS = {
  middle: {
    height: '24px',
    padding: '0 24px',
    lineHeight: '21px',
    borderRadius: '12px',
    fontSize: '16px',
  },
  large: {
    height: '48px',
    padding: '0 32px',
    lineHeight: '44px',
    borderRadius: '24px',
    fontSize: '32px',
  },
};

export default ({ size = 'middle' }) => {
  const styleOption = STYLE_OPTIONS[size];

  const { userInfo, login } = useModel(
    'global',
    (model) => ({
      userInfo: model.userInfo,
      login: model.login,
    }),
  );

  const formatAddress = (address) => {
    let result = '';
    if (address) {
      address.replace(/^(.{4})(.+)(.{4})$/gi, (str, $1, $2, $3) => {
        result = `${$1} **** ${$3}`;
      });
    }
    return result;
  };

  console.info("userInfo", userInfo);
  return userInfo ? (
    <Tooltip placement="bottom" title={userInfo.address ? userInfo.address : userInfo.email}>
      <span className={styles.account}>{userInfo.address ? formatAddress(userInfo.address) : userInfo.email}</span>
    </Tooltip>
  ) : (
    <div
      className={styles.wallet}
      style={styleOption}
      onClick={login}
    >
      connect
    </div>
  );
};
