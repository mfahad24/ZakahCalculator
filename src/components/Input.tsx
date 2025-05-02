import { Ref } from "react";
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
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        data-testid={id}
        disabled={disabled}
        id={id}
        ref={inputRef}
        onBlur={(evt) => onBlur(evt, id)}
        onChange={() => onChange(id, Number(value))}
        role="textbox"
        type="number"
        value={value ?? ""}
      />
      {userNisabEmpty && id === "userNisab" ? (
        <span className={styles.helpTip}>Nisab value is required</span>
      ) : null}
    </>
  );
};

export default Input;
