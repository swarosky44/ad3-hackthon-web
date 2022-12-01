import { useEffect } from 'react';
import { request } from '../../utils/request';

export default () => {
  const { code } = location.search
    .substr(1)
    .split('&')
    .reduce((res, item) => {
      const parts = item.split('=');
      res[parts[0]] = parts[1];
      return res;
    }, {});

  // 关闭当前 Tab 页面
  const closeCurrentPage = () => {
    if (navigator.userAgent.indexOf('MSIE') > 0) {
      if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
        window.opener = null;
        window.close();
      } else {
        window.open('', '_top');
        window.top.close();
      }
    } else if (navigator.userAgent.indexOf('Firefox') > 0) {
      window.location.href = 'about:blank ';
    } else {
      window.opener = null;
      window.open('', '_self', '');
      window.close();
    }
  };

  const authHandler = async () => {
    if (code) {
      try {
        const result = await request({
          method: 'GET',
          api: 'api/auth/twitterAuth',
          params: { code },
        });
        if (result && result.message) {
          const message = JSON.parse(result.message);
          if (message.token) {
            localStorage.setItem(
              'twitterAuth',
              JSON.stringify({ success: true, message }),
            );
          } else {
            localStorage.setItem(
              'twitterAuth',
              JSON.stringify({ success: false, message }),
            );
          }
        } else {
          localStorage.setItem(
            'twitterAuth',
            JSON.stringify({ success: false, message }),
          );
        }
      } catch (error) {
        localStorage.setItem(
          'twitterAuth',
          JSON.stringify({ success: false, message: {} }),
        );
      } finally {
        closeCurrentPage();
      }
    }
  };

  useEffect(authHandler, [code]);

  return null;
};
