import { history } from 'umi';
import { Form, Row, Col, Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.module}>
      <div className={styles.header}>
        <div style={{ flex: 1 }} onClick={() => history.goBack()}>
          <LeftOutlined />
          <span style={{ marginLeft: '12px' }}>Back</span>
        </div>
      </div>
      <div className={styles.content}>
        <div style={{ fontSize: '20px', marginBottom: '20px' }}>Create</div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Campaign Info</div>
          <Form layout="horizontal">
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item label="Profile page">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Campaign name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Sponsor">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};
