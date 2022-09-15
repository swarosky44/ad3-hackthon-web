import { useEffect, useState, useRef } from 'react';
import { List, Pagination, Skeleton } from 'antd';
import styles from './index.less';

let lock = false;
let searchInputVal = "";
const pageSize = 12;
export default () => {
  const [list, setList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  const searchInputRef = useRef(null);

  const fetchList = async ({
    taskName = '',
    taskDifficulty = 0,
    taskType = '',
    pageNum = 0,
  }) => {
    if (lock) return;
    lock = true;
    setListLoading(true);

    const params = { pageNum, pageSize };

    if (taskName) {
      params.taskName = taskName;
    }

    if (taskDifficulty > 0) {
      params.taskDifficulty = taskDifficulty;
    }

    if (taskType) {
      params.taskType = taskType;
    }

    try {
      const response = await window.fetch(
        'http://52.73.108.81:8080/pageQueryTask',
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        },
      );
      const result = response.json();
      console.info(result);

      setListVisible(true);
      setCurrent(pageNum);
    } catch (error) {

      console.warn(error);
      setListVisible(true);
      setCurrent(pageNum);
    }

    lock = false;
    setTimeout(() => {
      setListLoading(false);
    }, 500);
  };

  // 输出主体内容
  const renderContent = () => {
    if (listLoading) {
      return <Skeleton active />;
    }

    if (listVisible) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p className={styles.listTip}>
            We have retrieved the following matching results for you
            <div className={styles.listSort}>
              Filter by
              <div className={styles.listSortForm}>
                <div className={styles.listSortFormItem}>
                  Difficulty
                  <img
                    className={styles.sortArrow}
                    src={require('@/static/sortArrow.png')}
                  />
                </div>
                <div
                  className={styles.listSortFormItem}
                  style={{ marginLeft: '24px' }}
                >
                  Type
                  <img
                    className={styles.sortArrow}
                    src={require('@/static/sortArrow.png')}
                  />
                </div>
              </div>
            </div>
          </p>
          <List
            size="large"
            style={{ width: '100%', marginTop: '58px' }}
            loading={listLoading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            dataSource={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
            renderItem={(item) => (
              <a className={styles.listItemWrapper}>
                <div className={styles.listItem}>
                  <div className={styles.listItemHeader}>
                    <img
                      className={styles.listItemIcon}
                      src={require('@/static/card-icon1.png')}
                    />
                    <h3 className={styles.listItemTitle}>
                      [💰200 USDT] Newcomer Bonus Event ④🚀
                    </h3>
                  </div>
                  <div className={styles.listItemBottom}>
                    <div className={styles.listItemTag}>Product experience</div>
                    <div className={styles.listItemRank}>
                      {[1, 1, 1, 1].map((item, index) => (
                        <img
                          key={`rank-image-${index}`}
                          className={styles.listItemRankImage}
                          src={require('@/static/icon1.png')}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            )}
            pagination={{
              current,
              total: 100,
              onChange: v => fetchList({ taskName: searchInputVal, pageNum: v }),
            }}
          />
        </div>
      );
    } else {
      return (

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className={styles.cardWrapper}>
            {[
              {
                title: 'Beginner',
                desc: 'Take your Web3 Adventure by participating in an AMA or following on Twitter',
                arr: [1],
              },
              {
                title: 'Expert',
                desc: 'Actively participate in product interaction, which will help you become familiar with various web3 products faster',
                arr: [1, 1],
              },
              {
                title: 'Master',
                desc: 'Participate in the construction of some projects, release your web3 productivity to get airdrops or other rewards',
                arr: [1, 1, 1, 1],
              },
            ].map((item, index) => (
              <div
                key={`card-${index}`}
                className={styles[`card${index + 1}`]}
                onClick={() =>
                  fetchList({ taskDifficulty: item.arr.length, pageNum: 0 })
                }
              >
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardContent}>{item.desc}</p>
                <div className={styles.cardSort}>
                  <div className={styles.cardSortLine}>
                    <span className={styles.cardSortText}>Difficulty</span>
                    {item.arr.map((item, index) => (
                      <img
                        key={`sort-icon-${index}`}
                        className={styles.sortIcon}
                        src={require('@/static/icon1.png')}
                      />
                    ))}
                  </div>
                  <div className={styles.cardSortLine}>
                    <span className={styles.cardSortText}>Reward</span>
                    {item.arr.map((item, index) => (
                      <img
                        key={`sort-icon-${index}`}
                        className={styles.sortIcon}
                        src={require('@/static/icon2.png')}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.cardBtn}>Start</div>
              </div>
            ))}
          </div>
          <div className={styles.tipTitle}>
            While adventuring, don't forget to check your native score, it will
            improve with your experience
          </div>
          <div className={styles.example}>
            <img
              className={styles.slice1}
              src={require('@/static/slice1.png')}
            />
            <img className={styles.arrow} src={require('@/static/arrow.png')} />
            <img
              className={styles.slice2}
              src={require('@/static/slice2.png')}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className={styles.module}>
      <h1 className={styles.title}>Start your adventure in Web3</h1>
      <div className={styles.searchBar}>
        <input
          ref={searchInputRef}
          className={styles.searchInput}
          onChange={(e) => {
            searchInputVal = e.target.value;
          }}
        />
        <div className={styles.searchBtn} onClick={() => fetchList({ taskName: searchInputVal, pageNum: 0 })}>
          Search
        </div>
      </div>
      {renderContent()}
    </div>
  );
};
