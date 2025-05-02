import { Ref } from "react";
import Input from "./Input.js";

import { Data } from "./ZakahCalculator.js";

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
            <p>1. Enter your own nisab value (required)</p>
          ) : (
            field.label
          )
        }
        onChange={(evt) =>
          //@ts-ignore
          onChange(evt?.target?.id, Number(evt?.target?.value))
        }
        userNisabEmpty={userNisabEmpty}
        value={!loadingGoldValue ? Number(field.value) : null}
        onBlur={(evt) => onBlur(evt, field.id)}
      />
    );
  });
};

export default Inputs;
