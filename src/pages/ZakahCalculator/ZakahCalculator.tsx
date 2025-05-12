import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

import { useTranslation } from "react-i18next";

import { getArabicRightStyle } from "../../util/util.tsx";

import Inputs from "./Inputs.tsx";
import Header from "./Header.tsx";
import Totals from "./Totals.tsx";

import styles from "./ZakahCalculator.module.css";

/*
- create excel sheet for all locale text
- readme
- add google analytics + SEO
- add multi currency options
- add multi language options
- add info buttons where necessary
- improve browser compatability 
- update #4 language (consider 24k gold)
- add nisab with silver 
- differentiate user nisab value field from others
- add nav / router (beginnings of full fledged user profile/dashboard)
- context?
- react useQuery?
- react hook forms? 
- move out API calls and simplify zakah calc comp
- use local storage over cookies 
*/

export type Data = {
  id: string;
  value: number | null;
};

const ZakahCalculator = () => {
  const { t } = useTranslation("translation", { keyPrefix: "Header" });
  const [data, setData] = useState<Data[]>([
    {
      id: "userNisab",
      value: null,
    },
    {
      id: "cashOnHand",
      value: null,
    },
    {
      id: "loans",
      value: null,
    },
    {
      id: "gold",
      value: null,
    },
    {
      id: "stocks",
      value: null,
    },
    {
      id: "401k",
      value: null,
    },
    {
      id: "business",
      value: null,
    },
    {
      id: "realEstate",
      value: null,
    },
  ]);
  const [nisabValue, setNisabValue] = useState<number | null>(null);
  const [nisabError, setNisabError] = useState<React.ReactNode | string>("");
  const [loadingGoldValue, setLoadingGoldValue] = useState(true);
  const [userNisabEmpty, setUserNisabEmpty] = useState(false);
  const [isNegative, setIsNegative] = useState(false);
  const [isAboveMax, setIsAboveMax] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const goldApiKey = import.meta.env.VITE_GOLD_API_KEY;
  const jsonBinApiKey = import.meta.env.VITE_JSONBIN_API_KEY;
  const goldApiUrl = "https://www.goldapi.io/api/XAU/USD/";
  const jsonBinApiUrl = "https://api.jsonbin.io/v3/b/680a92f28561e97a5006d11b";

  const postNisabToDb = async (value: { value: string; expiresAt: number }) => {
    try {
      const response = await fetch(jsonBinApiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-key": jsonBinApiKey,
        },
        body: JSON.stringify(value),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("\x1b[31m%s\x1b[0m", "Failed to POST to json bin -> ", error);
    }
  };

  const getNisabFromDb = async () => {
    try {
      const response = await fetch(`${jsonBinApiUrl}?meta=false`, {
        method: "GET",
        headers: {
          "X-Master-key": jsonBinApiKey,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "Failed to GET from json bin -> ",
        error
      );
    }
  };

  useEffect(() => {
    if (
      !import.meta.env.VITE_JSONBIN_API_KEY ||
      !import.meta.env.VITE_GOLD_API_KEY
    ) {
      throw new Error("Check your API keys in your .env file!");
    }

    /*
    1. get value from cookies
    2. if no cookies & value NOT EXPIRED, get value from DB
    3. if no cookies & value EXPIRED, get value from gold API
    */
    const fetchGoldPrice = async () => {
      const storedNisabValue = Cookies.get("nisabValue");
      const invalid = ["null", "undefined"];
      const invalidValues =
        storedNisabValue && invalid.includes(storedNisabValue);

      if (storedNisabValue && !invalidValues) {
        console.log(
          "\x1b[32m%s\x1b[0m",
          `using gold value from COOKIES: $${storedNisabValue}`
        );

        setNisabValue(Number(storedNisabValue));
        setLoadingGoldValue(false);
      } else if (storedNisabValue === null || storedNisabValue === undefined) {
        const result = await getNisabFromDb();
        const now = Date.now() + 24 * 60 * 60 * 1000;
        const twentyFourHours = 20 * 60 * 60 * 1000;

        if (now - result.expiresAt < twentyFourHours) {
          setNisabValue(Number(result.value));
          Cookies.set("nisabValue", result.value, { expires: 1 });
          setLoadingGoldValue(false);
          console.log(
            "\x1b[32m%s\x1b[0m",
            `using gold value from DATABASE: $${result.value}`
          );
        } else {
          try {
            const response = await fetch(goldApiUrl, {
              method: "GET",
              headers: {
                "x-access-token": goldApiKey,
              },
            });

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const result = await response.json();
            const nisabValue = (result.price * 3).toFixed(2);

            setNisabValue(Number(nisabValue));
            Cookies.set("nisabValue", nisabValue, { expires: 1 });
            postNisabToDb({
              value: nisabValue,
              expiresAt: Date.now() + 24 * 60 * 60 * 1000,
            });
          } catch (error) {
            setNisabError(
              <span className={styles.error}>{t("nisabLoading_error")}</span>
            );
            console.log(
              "\x1b[31m%s\x1b[0m",
              "Failed to fetch gold price -> ",
              error
            );
          } finally {
            setLoadingGoldValue(false);
          }
        }
      }
    };

    fetchGoldPrice();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [nisabError]);

  const onChange = (id: string, value: number): void => {
    console.log(value, typeof value);
    setData((prevData) =>
      prevData.map((item: Data) => (item.id === id ? { ...item, value } : item))
    );
  };

  const onBlur = (evt: React.FocusEvent<HTMLInputElement>, id: string) => {
    if (id === "userNisab" && nisabError) {
      if (evt.target.value === "") {
        setUserNisabEmpty(true);
      } else {
        setUserNisabEmpty(false);
      }
    }

    if (Number(evt.target.value) < 0 || data.some((d) => Number(d.value) < 0)) {
      setIsNegative(true);
    } else {
      setIsNegative(false);
    }

    if (
      Number(evt.target.value) >= 1000000000 ||
      data.some((d) => Number(d.value) >= 1000000000)
    ) {
      setIsAboveMax(true);
    } else {
      setIsAboveMax(false);
    }
  };

  const errorRightAlign = getArabicRightStyle(styles.rightAlign);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.left}>
          <Header
            loadingGoldValue={loadingGoldValue}
            nisabError={nisabError}
            nisabValue={nisabValue}
          />
          <Totals
            data={data}
            nisabValue={nisabValue}
            isAboveMax={isAboveMax}
            isNegative={isNegative}
            userNisabEmpty={userNisabEmpty}
          />
        </div>
        <div className={styles.right}>
          {isNegative && (
            <p
              className={`${styles.error} ${
                errorRightAlign ? errorRightAlign : ""
              }`}
            >
              {t("noNegativeValues")}
            </p>
          )}
          {isAboveMax && (
            <p
              className={`${styles.error} ${
                errorRightAlign ? errorRightAlign : ""
              }`}
            >
              {t("noValueAboveOneBillion")}
            </p>
          )}
          <Inputs
            data={data}
            inputRef={inputRef}
            isNegative={isNegative}
            loadingGoldValue={loadingGoldValue}
            nisabError={nisabError}
            onChange={onChange}
            onBlur={onBlur}
            userNisabEmpty={userNisabEmpty}
          />
        </div>
      </div>
    </>
  );
};

export default ZakahCalculator;
