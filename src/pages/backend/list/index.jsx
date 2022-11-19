import { useState } from "react";
import { List } from "antd";
import styles from "./index.less";
import { Link } from "umi";

export default () => {
  const [data, setData] = useState([1, 1, 1, 1]);
  return (
    <div className={styles.module}>
      <div className={styles.header}>
        <div style={{ flex: 1 }}>Campaign History</div>
        <Link to="/backend/create">
          <div className={styles.button}>Create</div>
        </Link>
      </div>
      <div className={styles.content}>
        <List
          itemLayout="vertical"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <div className={styles.card}>
                <div className={styles.campaginPic} />
                <div className={styles.campaginContent}>
                  <div className={styles.campaignTitle}>
                    Campaign Name
                  </div>
                  <div className={styles.campaignTime}>
                    Start Time - End Time
                  </div>
                </div>
                <Link to="/backend/detail/1">
                  <div className={styles.campaignButton}>View</div>
                </Link>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
