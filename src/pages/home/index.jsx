import { Link } from 'umi';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.module}>
      <h1 className={styles.title}>Take Adventure in Web3</h1>
      <h1 className={styles.title}>All in One Easy to use Use to earn</h1>
      <Link className={styles.launchBtn} to="/adventure3">Launch APP</Link>
      <h1 className={styles.title}>Web3 users have to find tasks</h1>
      <h1 className={styles.title}>on different platforms</h1>
      <p className={styles.content}>
        Web3 has become the largest consensus in the global technology industry,
        and the Market Size, VCs, and User Adoption are showing a blowout trend.
        However, there is a huge supply and demand information asymmetry between
        users and applications.
      </p>
      <p className={styles.content} style={{ marginBottom: '196px' }}>
        Web3 newcomers enter crypto space full of confusion, there is too many
        concepts and too many tools, and beginners have no idea where and how to
        find the right things to do.
      </p>
      <div className={styles.layoutRight} style={{ marginBottom: '338px' }}>
        <h1 className={styles.title}>On-Chain Resume is</h1>
        <h1 className={styles.title}>scattered, poorly readable</h1>
        <p className={styles.content}>
          An on-chain resume is proof of a person's participation and experience
          in the crypto community. Users can buidl on-chain resume through many
          different blockchain and Dapps, as a result it is necessary to provide
          a beginner-friendly, visually, on-chain resume aggregator.
        </p>
      </div>
      <h1 className={styles.title}>Your Web3 Task Aggregator </h1>
      <h1 className={styles.title}>and On-Chain Resume Manager</h1>
      <p className={styles.content}>
        Adventure3 is a Web3 University and Task Center, users can conveniently
        discover the newest & most interesting Web3 tasks, and earn crypto by
        finished them. We also obtain your on-chain Interact data and display it
        visually which is called native score , inorder to make it easy to show
        and manage.
      </p>
      <p className={styles.content} style={{ marginBottom: '445px' }}>
        The best time to start building your on-chain resume is today in AD3！
      </p>
      <img
        className={styles.banner1}
        src={require("@/static/banner1.png")}
      />
      <img
        className={styles.banner2}
        src={require("@/static/banner2.png")}
      />
      <img
        className={styles.banner3}
        src={require("@/static/banner3.png")}
      />
      <img
        className={styles.banner4}
        src={require("@/static/banner4.png")}
      />
    </div>
  );
};
