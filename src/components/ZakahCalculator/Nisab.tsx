import { IoInformationCircleOutline } from "react-icons/io5";

import { renderIcon } from "../../util/util";

import styles from "./ZakahCalculator.module.css";

const Nisab = ({
  loadingGoldValue,
  nisabError,
  nisabValue,
}: {
  loadingGoldValue: boolean;
  nisabError: React.ReactNode | string;
  nisabValue: number | null;
}) => {
  const renderNisabMessage = (
    loadingGoldValue: boolean,
    nisabValue: number | null,
    nisabError: React.ReactNode | string
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
        )?.toFixed(2)}`;
      }
    }
  };
  return (
    <p>
      <strong className={styles.nisabValue}>
        {renderNisabMessage(loadingGoldValue, nisabValue, nisabError)}
        {!loadingGoldValue && !nisabError
          ? renderIcon(IoInformationCircleOutline, 18, "black")
          : null}
      </strong>
    </p>
  );
};

export default Nisab;
