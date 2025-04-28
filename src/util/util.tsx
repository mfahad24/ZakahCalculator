export const inputTotal = (data: any[] | FormData) => {
  const total = data.reduce(
    (accumulator: number, currentValue: { id: string; value: number }) => {
      return (
        currentValue.id !== "userNisab" && accumulator + currentValue.value
      );
    },
    0
  );
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
  }
  // else if (!nisabValue) {
  //   console.log(nisabValue);
  //   return;
  // }
  else {
    return 0;
  }
};

export const formatCurrency = (value: number) => {
  return value?.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
