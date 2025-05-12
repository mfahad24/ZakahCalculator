import { useTranslation } from "react-i18next";
import { getArabicRightStyle } from "../../util/util";
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
  const { t } = useTranslation("translation", { keyPrefix: "Header" });

  const renderNisabMessage = (
    loadingGoldValue: boolean,
    nisabValue: number | null,
    nisabError: React.ReactNode | string
  ) => {
    const className = getArabicRightStyle(styles.rightAlign);

    const value = Number(nisabValue).toFixed(2);
    const symbol = nisabValue ? "$" : "";

    if (nisabError) {
      return nisabError;
    } else {
      if (loadingGoldValue) {
        return (
          <span className={styles.spinner} role="spinner">
            {t("nisabValue_loading")}
            <span className={styles.dots}></span>
          </span>
        );
      } else {
        return (
          <span className={className ? className : ""}>
            {t("nisabValue_success", { symbol: symbol, value: value })}
          </span>
        );
      }
    }
  };
  return (
    <>
      <p>
        <strong className={styles.nisabValue}>
          {renderNisabMessage(loadingGoldValue, nisabValue, nisabError)}
        </strong>
      </p>
    </>
  );
};

export default Nisab;
