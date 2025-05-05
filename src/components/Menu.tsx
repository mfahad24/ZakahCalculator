import { IoLogInOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import styles from "./ZakahCalculator.module.css";

const Menu = () => {
  const isOpen = true;
  const isActive = true;

  const renderIcon = (
    Icon: React.ComponentType<{
      size?: number;
      color?: string;
      style?: React.CSSProperties;
    }>
  ) => {
    return (
      <Icon
        size={20}
        color="white"
        style={{ position: "relative", top: "4px", left: "3px" }}
      />
    );
  };

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
          Welcome, mfahad24!
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
