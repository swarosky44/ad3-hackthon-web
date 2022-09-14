import { useEffect } from 'react';
import Header from './components/header';
import styles from './index.less';
import 'antd/dist/antd.css';

export default (props) => {
  useEffect(() => {

  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.concat}>
          {[
            'concat-icon1.png',
            'concat-icon2.png',
            'concat-icon3.png',
            'concat-icon4.png',
            'concat-icon5.png',
          ].map(url => (
            <a className={styles.iconWrapper}>
              <img
                className={styles.icon}
                src={require(`@/static/${url}`)}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
