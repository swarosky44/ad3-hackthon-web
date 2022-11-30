import { useEffect } from "react";
import { TwitterOutlined } from "@ant-design/icons";
import styles from "./index.less";

export default ({ url = '', close = () => {} }) => {
  useEffect(() => {
    document.body.style = "overflow:hidden;";
    return () => {
      document.body.style = "overflow:scroll";
    };
  }, []);

  return (
    <div className={styles.modal}>
      <div
        className={styles.mask}
        onClick={close}
      />
      <div className={styles.content}>
        <div className={styles.title}>Connect your account</div>
        <div className={styles.desc}>Twitter account is not connected. Please connect your Twitter account.</div>
        <div
          className={styles.btn}
          onClick={() => {
            location.assign(url);
          }}
        >
          <TwitterOutlined style={{ fontSize: '24px', marginRight: '12px', color: 'rgb(29, 155, 240)' }} />
          Connect Twitter
        </div>
      </div>
    </div>
  );
}
