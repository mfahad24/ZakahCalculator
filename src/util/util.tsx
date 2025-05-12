import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Data } from "../pages/ZakahCalculator/ZakahCalculator";

export const inputTotal = (data: Data[]) => {
  const total = data.reduce((accumulator: number, currentValue: Data) => {
    return currentValue.id !== "userNisab" && currentValue.value !== null
      ? accumulator + currentValue.value
      : accumulator;
  }, 0);
  return total;
};

export const zakahDue = (
  inputTotal: number,
  nisabValue: number | null,
  userNisab: number | null
) => {
  const nisab = userNisab ? userNisab : nisabValue;
  if (nisab && inputTotal >= nisab) {
    return inputTotal * 0.025;
  } else {
    return 0;
  }
};

export const formatCurrency = (value: number) => {
  return value?.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getArabicRightStyle = (className: string) => {
  const { i18n } = useTranslation();

  return i18n.language === "ar-EG" && className;
};

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};
