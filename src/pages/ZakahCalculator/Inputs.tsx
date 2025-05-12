import { useTranslation } from "react-i18next";
import { Ref } from "react";
import Input from "./Input";

import { Data } from "./ZakahCalculator";

const Inputs = ({
  data,
  inputRef,
  isNegative,
  loadingGoldValue,
  nisabError,
  onChange,
  onBlur,
  userNisabEmpty,
}: {
  data: Data[];
  inputRef: Ref<HTMLInputElement>;
  isNegative: boolean;
  loadingGoldValue: boolean;
  nisabError: React.ReactNode | string;
  onBlur: (evt: React.FocusEvent<HTMLInputElement>, id: string) => void;
  onChange: (id: string, value: number) => void;
  userNisabEmpty: boolean;
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "Header" });

  return data.map((field, index) => {
    return (
      <Input
        key={index}
        disabled={loadingGoldValue}
        id={field.id}
        isNegative={isNegative}
        inputRef={field.id === "userNisab" ? inputRef : null}
        label={
          field.id === "userNisab" && nisabError ? (
            <p>{t("userNisab_required")}</p>
          ) : (
            <p>
              {field.id === "userNisab" ? t("userNisab_optional") : t(field.id)}
            </p>
          )
        }
        //@ts-ignore
        onChange={(evt: { target: { id: any; value: any } }) =>
          onChange(evt.target.id, Number(evt.target.value))
        }
        userNisabEmpty={userNisabEmpty}
        value={field.value}
        onBlur={(evt) => onBlur(evt, field.id)}
      />
    );
  });
};

export default Inputs;
