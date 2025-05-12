import { useTranslation } from "react-i18next";
import { inputTotal, zakahDue, formatCurrency } from "../../util/util.js";
import { Data } from "./ZakahCalculator.js";
import styles from "./ZakahCalculator.module.css";

const Totals = ({
  data,
  nisabValue,
  isAboveMax,
  isNegative,
  userNisabEmpty,
}: {
  data: Data[];
  nisabValue: number | null;
  isAboveMax: boolean;
  isNegative: boolean;
  userNisabEmpty: boolean;
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "Header" });

  const renderZakahDue = (
    isAboveMax: boolean,
    isNegative: boolean,
    userNisabEmpty: boolean
  ) => {
    if (isAboveMax || isNegative || userNisabEmpty) {
      return <span className={styles.error}>{t("seeFormErrors")}</span>;
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
          <label>{t("eligibleForZakah")}</label>
          <span>${formatCurrency(inputTotal(data))}</span>
        </div>
        <div className={styles.amount}>
          <label>{t("yourZakahDue")}</label>
          <span>{renderZakahDue(isAboveMax, isNegative, userNisabEmpty)}</span>
        </div>
      </div>
    </>
  );
};

export default Totals;
