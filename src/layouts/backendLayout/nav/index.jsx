import { Link } from "umi";
import styles from "./index.less";

const menu = [
  { link: '/backend/list', tab: 'History' },
];
export default ({ location = {} }) => {
  const { pathname } = location;

  return (
    <div className={styles.module}>
      {menu.map((m, i) => (
        <Link
          key={i}
          className={pathname === m.link ? styles.activeMenu : styles.menu}
          to={m.link}
        >
          {m.tab}
        </Link>
      ))}
    </div>
  );
}
