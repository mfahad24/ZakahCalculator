import Icon from "../../components/Icon/Icon";

import { Link } from "react-router-dom";

import { IoLogInOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import styles from "./ZakahCalculator.module.css";
import i18n from "../../util/i18n";
import { ChangeEvent } from "react";

const Menu = () => {
  const isOpen = true;
  const isActive = true;
  const userName = "mfahad24";

  const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    console.log(evt.target.value);
    i18n.changeLanguage(evt.target.value);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.leftNav}>
        <Link to="/" className={styles.link}>
          Dashboard
        </Link>
        <Link
          to="/zakah-calculator"
          className={`${styles.link} ${isActive && styles.active}`}
        >
          Zakah Calculator
        </Link>
      </div>

      <div className={styles.rightNav}>
        <a href="#user" className={styles.link}>
          Welcome, {userName}!
        </a>
        <select
          id="languages"
          name="languages"
          className={`${styles.link} ${styles.select}`}
          onChange={(evt) => handleChange(evt)}
        >
          <option value="en-US">English</option>

          <option value="ar-EG">Arabic</option>
        </select>
        <a href="#currency" className={styles.link}>
          USD
          {isOpen ? Icon(IoIosArrowDown) : Icon(IoIosArrowUp)}
        </a>
        <a href="#logout" className={styles.link}>
          Logout
          {Icon(IoLogInOutline)}
        </a>
      </div>
    </nav>
  );
};

export default Menu;
