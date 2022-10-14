import { useEffect } from 'react';
import { Link } from 'umi';
import Header from './components/header';
import styles from './index.less';
import 'antd/dist/antd.css';

export default (props) => {
  useEffect(() => {}, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>{props.children}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogoWrap}>
            <img
              className={styles.footerLogo}
              src={require("@/static/logo.png")}
            />
            <p>Adventure3</p>
          </div>
          <div className={styles.footerMenu}>
            {[
              { name: 'Home', path: '/home' },
              { name: 'Adventure3', path: '/adventure3' },
              { name: 'Native Score', path: '/native' },
            ].map((m, i) => (
              <Link to={m.path} key={i} key={`footer-menu-${i}`} style={{ marginTop: i === 0 ? 0 : '12px', color: '#000' }}>
                <span className={styles.menu}>{m.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.concat}>
          {[
            'concat-icon1.png',
            'concat-icon2.png',
            'concat-icon3.png',
            'concat-icon4.png',
            'concat-icon5.png',
          ].map((url, index) => (
            <a key={`footer-icon-${index}`} className={styles.iconWrapper}>
              <img className={styles.icon} src={require(`@/static/${url}`)} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
