import { useEffect, useState, useRef } from 'react';
import { List, Pagination, Select, Skeleton } from 'antd';
import { TASK_DIFFICULTY, TASK_TYPE } from '@/utils/const';
import styles from './index.less';

let lock = false;
let searchInputVal = "";
const pageSize = 12;
export default () => {
  const [list, setList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [taskDifficultyVisible, setTaskDifficultyVisible] = useState(false);
  const [taskTypeVisible, setTaskTypeVisible] = useState(false);
  const [activeDifficulty, setActiveDifficulty] = useState(-1);
  const [activeType, setActiveType] = useState("");

  const fetchList = async ({ pageNum = 0 }) => {
    if (lock) return;
    lock = true;
    setListLoading(true);

    const params = { pageNum, pageSize };

    if (searchInputVal) {
      params.taskName = searchInputVal;
    }

    if (activeDifficulty > 0) {
      params.taskDifficulty = TASK_DIFFICULTY[activeDifficulty].value;
    }

    if (activeType > 0) {
      params.taskType = TASK_TYPE[activeType].value;
    }

    try {
      const response = await window.fetch(
        'https://www.adventure3.tk/pageQueryTask',
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        },
      );
      const result = await response.json();
      if (result && result.dataList) {
        setList(result.dataList);
        setListVisible(true);
        setCurrent(result.pageNum);
        setTotal(result.totalCount);
      }
    } catch (error) {
      console.warn(error);
    }

    lock = false;
    setTimeout(() => {
      setListLoading(false);
    }, 200);
  };

  // 输出卡片难度数组
  const createIconArr = (amount = 0) => {
    const result = [];
    for (let i = 0; i < amount; i += 1) {
      result.push(1);
    }
    return result;
  };

  // 选择难度
  const onDifficultySelect = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveDifficulty(index);
  }
  
  // 选择类型
  const onTypeSelect = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveType(index);
  }

  useEffect(() => {
    if (listVisible) {
      fetchList({ pageNum: 1 });
      setTaskTypeVisible(false);
      setTaskDifficultyVisible(false);
    }
  }, [activeDifficulty, activeType]);

  // 输出不同难度的卡片 ICON
  const renderTaskDifficultyIcon = (amount = 0) => {
    if (amount <= 1) {
      return (
        <img
          className={styles.listItemIcon}
          src={require('@/static/card-icon1.png')}
        />
      );
    } else if (amount > 1 && amount <=4) {
      return (
        <img
          className={styles.listItemIcon}
          src={require('@/static/card-icon2.png')}
        />
      );
    } else {
      return (
        <img
          className={styles.listItemIcon}
          src={require('@/static/card-icon3.png')}
        />
      );
    }
  }

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
            width: '100%',
          }}
          onClick={() => {
            setTaskDifficultyVisible(false);
            setTaskTypeVisible(false);
          }}
        >
          <p className={styles.listTip}>
            We have retrieved the following matching results for you
            <div className={styles.listSort}>
              Filter by
              <div className={styles.listSortForm}>
                <div
                  className={styles.listSortFormItem}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setTaskDifficultyVisible(!taskDifficultyVisible);
                    setTaskTypeVisible(false);
                  }}
                >
                  Difficulty
                  <img
                    className={styles.sortArrow}
                    src={require('@/static/sortArrow.png')}
                  />
                  <div className={styles.selectBox} style={{ visibility: taskDifficultyVisible ? 'visible' : 'hidden' }}>
                    <ul className={styles.selectList}>
                      {TASK_DIFFICULTY.map((item, index) => (
                        <li
                          key={`difficulty-${index}`}
                          className={activeDifficulty === index ? styles.selectActiveItem : styles.selectItem}
                          onClick={e => onDifficultySelect(e, index)}
                        >
                          {item.value > 0 ? (
                            createIconArr(item.value).map((jtem, jndex) => (
                              <img
                                key={`difficulty-image-${jndex}`}
                                className={styles.listItemRankImage}
                                src={require('@/static/icon1.png')}
                              />
                            ))
                          ) : item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  className={styles.listSortFormItem}
                  style={{ marginLeft: '24px' }}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setTaskDifficultyVisible(false);
                    setTaskTypeVisible(!taskTypeVisible);
                  }}
                >
                  Type
                  <img
                    className={styles.sortArrow}
                    src={require('@/static/sortArrow.png')}
                  />
                  <div className={styles.selectBox} style={{ visibility: taskTypeVisible ? 'visible' : 'hidden' }}>
                    <ul className={styles.selectList}>
                      {TASK_TYPE.map((item, index) => (
                        <li
                          key={`type-${index}`}
                          className={activeType === index ? styles.selectActiveItem : styles.selectItem}
                          onClick={e => onTypeSelect(e, index)}
                        >
                          {item.value ? item.value : item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
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
            locale={{ emptyText: 'NO DATA' }}
            dataSource={list}
            renderItem={(item) => (
              <a className={styles.listItemWrapper} target="_blank" href={item.taskJumpUrl}>
                <div className={styles.listItem}>
                  <div className={styles.listItemHeader}>
                    {renderTaskDifficultyIcon(+item.taskDifficulty)}
                    <h3 className={styles.listItemTitle}>
                      {item.taskName.length >= 30 ? `${item.taskName.slice(0, 30)}...` : item.taskName}
                    </h3>
                  </div>
                  <div className={styles.listItemBottom}>
                    <div className={styles.listItemTag}>{item.taskType.length >= 20 ? `${item.taskType.slice(0, 20)}...` : item.taskType}</div>
                    <div className={styles.listItemRank}>
                      {createIconArr(+item.taskDifficulty).map((item, index) => (
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
              pageSize,
              total,
              onChange: v => fetchList({ pageNum: v }),
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
                  fetchList({ taskDifficulty: item.arr.length, pageNum: 1 })
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
          className={styles.searchInput}
          onChange={(e) => {
            searchInputVal = e.target.value;
          }}
        />
        <div className={styles.searchBtn} onClick={() => fetchList({ pageNum: 1 })}>
          Search
        </div>
      </div>
      {renderContent()}
    </div>
  );
};
