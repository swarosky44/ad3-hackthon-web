import { List } from 'antd';
import { useState } from 'react';
import styles from './index.less';

export default () => {
  const [sortVisible, setSortVisible] = useState(false);
  const [listVisible, setListVisible] = useState(true);

  return (
    <div className={styles.module}>
      <h1 className={styles.title}>Start your adventure in Web3</h1>
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          onChange={(e) => console.info(e.target.value)}
        />
        <div className={styles.searchBtn}>Search</div>
      </div>
      {/* 任务合集 */}
      {sortVisible ? (
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
              <div className={styles[`card${index + 1}`]}>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardContent}>{item.desc}</p>
                <div className={styles.cardSort}>
                  <div className={styles.cardSortLine}>
                    <span className={styles.cardSortText}>Difficulty</span>
                    {item.arr.map(() => (
                      <img
                        className={styles.sortIcon}
                        src={require('@/static/icon1.png')}
                      />
                    ))}
                  </div>
                  <div className={styles.cardSortLine}>
                    <span className={styles.cardSortText}>Reward</span>
                    {item.arr.map(() => (
                      <img
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
      ) : null}
      {listVisible ? (
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
                    src={require("@/static/sortArrow.png")}
                  />
                </div>
                <div className={styles.listSortFormItem} style={{marginLeft: '24px' }}>
                  Type
                  <img
                    className={styles.sortArrow}
                    src={require("@/static/sortArrow.png")}
                  />
                </div>
              </div>
            </div>
          </p>
          <List
            size="large"
            style={{ width: '100%', marginTop: '58px' }}
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
            renderItem={item => (
              <a
                className={styles.listItemWrapper}
              >
                <div className={styles.listItem}>
                  <div className={styles.listItemHeader}>
                    <img
                      className={styles.listItemIcon}
                      src={require("@/static/card-icon1.png")}
                    />
                    <h3 className={styles.listItemTitle}>[💰200 USDT] Newcomer Bonus Event ④🚀</h3>
                  </div>
                  <div className={styles.listItemBottom}>
                    <div className={styles.listItemTag}>Product experience</div>
                    <div className={styles.listItemRank}>
                      {[1, 1, 1, 1].map(() => (
                        <img
                          className={styles.listItemRankImage}
                          src={require("@/static/icon1.png")}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            )}
          />
        </div>
      ) : null}
    </div>
  );
};
