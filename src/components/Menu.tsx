import { IoLogInOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { renderIcon } from "../util/util";

import styles from "./ZakahCalculator.module.css";

const Menu = () => {
  const isOpen = true;
  const isActive = true;
  const userName = "mfahad24";

  return (
    <nav className={styles.nav}>
      <div className={styles.leftNav}>
        <a href="#dashboard" className={styles.link}>
          Dashboard
        </a>
        <a
          href="#zakahcalculator"
          className={`${styles.link} ${isActive && styles.active}`}
        >
          Zakah Calculator
        </a>
      </div>

      <div className={styles.rightNav}>
        <a href="#user" className={styles.link}>
          Welcome, {userName}!
        </a>
        <a href="#language" className={styles.link}>
          English
          {isOpen ? renderIcon(IoIosArrowDown) : renderIcon(IoIosArrowUp)}
        </a>
        <a href="#currency" className={styles.link}>
          USD
          {isOpen ? renderIcon(IoIosArrowDown) : renderIcon(IoIosArrowUp)}
        </a>

        <a href="#logout" className={styles.link}>
          Logout
          {renderIcon(IoLogInOutline)}
        </a>
      </div>
    </nav>
  );
};

export default Menu;
