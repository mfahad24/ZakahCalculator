import { Trans, useTranslation } from "react-i18next";
import Nisab from "./Nisab";
import { useWindowWidth, getArabicRightStyle } from "../../util/util";
import styles from "./ZakahCalculator.module.css";

const Header = ({
  loadingGoldValue,
  nisabError,
  nisabValue,
}: {
  loadingGoldValue: boolean;
  nisabError: React.ReactNode | string;
  nisabValue: number | null;
}) => {
  const { t, i18n } = useTranslation("translation", { keyPrefix: "Header" });

  console.log(i18n.language);
  return (
    <>
      <h1
        className={`${styles.header} ${getArabicRightStyle(styles.rightAlign)}`}
      >
        {t("header")}
      </h1>
      <Nisab
        loadingGoldValue={loadingGoldValue}
        nisabError={nisabError}
        nisabValue={nisabValue}
      />
      <p
        className={`${styles.description} ${getArabicRightStyle(
          styles.rightAlign
        )}`}
      >
        {t("descriptionOne")}
      </p>
      <p
        className={`${styles.description} ${getArabicRightStyle(
          styles.rightAlign
        )}`}
      >
        <Trans
          //Trans doesnt translate "keyPrefix"
          i18nKey="Header.descriptionTwo"
          components={{
            linkOne: (
              <a
                href="https://goldprice.org/gold-price-history.html"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            ),
          }}
        />
      </p>
      <p
        className={`${styles.description} ${getArabicRightStyle(
          styles.rightAlign
        )}`}
      >
        {/* Should you have any questions about Zakah please contact the{" "}
        <a
          href="https://www.amjaonline.org/fatwa/en/79978/Zakah"
          target="_blank"
        >
          Assembly of Muslim Jurists of America (AMJA)
        </a>{" "}
        <a href="tel:+9162396233">(916)239–6233</a>. */}
        <Trans
          //Trans doesnt translate "keyPrefix"
          i18nKey="Header.descriptionThree"
          components={{
            linkOne: (
              <a
                href="https://www.amjaonline.org/fatwa/en/79978/Zakah"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            ),
            linkTwo: (
              <a
                href="tel:+9162396233"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            ),
          }}
        />
      </p>
      {!nisabError && (
        <p
          className={`${styles.disclosure} ${getArabicRightStyle(
            styles.rightAlign
          )}`}
        >
          {t("updateDisclosure")}
        </p>
      )}
      {useWindowWidth() > 768 && <hr />}
    </>
  );
};

export default Header;
