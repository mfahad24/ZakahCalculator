import { inputTotal, zakahDue, formatCurrency } from "../util/util.js";

import styles from "./ZakahCalculator.module.css";

const Totals = ({
  data,
  nisabValue,
  isAboveMax,
  isNegative,
  userNisabEmpty,
}: {
  data: Array;
  nisabValue: number;
}) => {
  const renderZakahDue = (
    isAboveMax: any,
    isNegative: any,
    userNisabEmpty: any
  ) => {
    if (isAboveMax || isNegative || userNisabEmpty) {
      return <span className={styles.error}>see form errors</span>;
    } else {
      return (
        `$` +
        formatCurrency(zakahDue(inputTotal(data), nisabValue, data[0].value))
      );
    }
  };

  return (
    <>
      <div className={styles.totals}>
        <div className={styles.amount}>
          <label>Total Eligible For Zakah</label>
          <span>${formatCurrency(inputTotal(data))}</span>
        </div>
        <div className={styles.amount}>
          <label>Your Zakah Due</label>
          <span>{renderZakahDue(isAboveMax, isNegative, userNisabEmpty)}</span>
        </div>
      </div>
    </>
  );
};

export default Totals;
