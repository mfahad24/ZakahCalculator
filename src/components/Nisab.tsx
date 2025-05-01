import styles from "./ZakahCalculator.module.css";

const Nisab = ({
  loadingGoldValue,
  nisabError,
  nisabValue,
}: {
  loadingGoldValue: boolean;
  nisabError: string;
  nisabValue: number;
}) => {
  const renderNisabMessage = (
    loadingGoldValue: boolean,
    nisabValue: number,
    nisabError: string
  ) => {
    if (nisabError) {
      return nisabError;
    } else {
      if (loadingGoldValue) {
        return (
          <span className={styles.spinner} role="spinner">
            Retrieving nisab value<span className={styles.dots}></span>
          </span>
        );
      } else {
        return `Current nisab value: ${nisabValue ? "$" : ""}${Number(
          nisabValue
        )?.toFixed(2)}*`;
      }
    }
  };
  return (
    <p>
      <strong className={styles.nisabValue}>
        {renderNisabMessage(loadingGoldValue, nisabValue, nisabError)}
      </strong>
    </p>
  );
};

export default Nisab;
