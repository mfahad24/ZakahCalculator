import styles from "./ZakahCalculator.module.css";

const Header = () => {
  return (
    <>
      <h1 className={styles.header}>Zakah Calculator</h1>
      <p className={styles.description}>
        Your zakah due is calculated at 2.5% of your total amount only if your
        total amount is equal to or above the nisab. Nisab is the price of gold
        per ounce x 3.
      </p>
      <p className={styles.description}>
        If you have a{" "}
        <a href="https://goldprice.org/gold-price-history.html" target="_blank">
          nisab value from a different date
        </a>{" "}
        or have your own nisab value from a different source, enter it on line
        1.
      </p>
      <p className={`${styles.description} ${styles.secondary}`}>
        Should you have any questions about Zakah please contact the{" "}
        <a
          href="https://www.amjaonline.org/fatwa/en/79978/Zakah"
          target="_blank"
        >
          Assembly of Muslim Jurists of America (AMJA)
        </a>{" "}
        <a href="tel:+9162396233">(916)239–6233</a>.
      </p>
    </>
  );
};

export default Header;
