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

export const renderIcon = (
  Icon: React.ComponentType<{
    size?: number;
    color?: string;
    style?: React.CSSProperties;
  }>,
  size?: number,
  color?: string
) => {
  return (
    <Icon
      size={size}
      color={color}
      style={{ position: "relative", top: "4px", left: "3px" }}
    />
  );
};
