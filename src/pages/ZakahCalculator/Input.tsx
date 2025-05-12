import { Ref } from "react";
import { getArabicRightStyle } from "../../util/util";
import styles from "./ZakahCalculator.module.css";

const Input = ({
  disabled,
  id,
  inputRef,
  label,
  onBlur,
  onChange,
  userNisabEmpty,
  value,
}: {
  disabled: boolean;
  id: string;
  inputRef: Ref<HTMLInputElement>;
  isNegative: boolean;
  label: React.ReactNode;
  onBlur: (evt: React.FocusEvent<HTMLInputElement>, id: string) => void;
  onChange: (id: string, value: number) => void;
  userNisabEmpty: boolean;
  value: number | null;
}) => {
  return (
    <>
      <label
        className={`${styles.label} ${getArabicRightStyle(styles.rightAlign)}`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className={styles.symbol}>
        <input
          className={`${styles.input} ${getArabicRightStyle(
            styles.rightAlign
          )}`}
          data-testid={id}
          disabled={disabled}
          id={id}
          ref={inputRef}
          onBlur={(evt) => onBlur(evt, id)}
          //@ts-ignore
          onChange={onChange}
          role="textbox"
          type="number"
          //@ts-ignore
          value={value}
        />
      </div>
      {userNisabEmpty && id === "userNisab" ? (
        <span className={styles.helpTip}>Nisab value is required</span>
      ) : null}
    </>
  );
};

export default Input;
