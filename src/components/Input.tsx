import styles from "./ZakahCalculator.module.css";

const Input = ({
  activeElement,
  disabled,
  id,
  inputRef,
  isNegative,
  label,
  onBlur,
  onChange,
  userNisabEmpty,
  value,
}: {
  activeElement: string;
  disabled: boolean;
  id: string;
  inputRef: HTMLInputElement;
  isNegative: boolean;
  label: string;
  onBlur: Function;
  onChange: Function;
  userNisabEmpty: boolean;
  value: string;
}) => {
  console.log(inputRef);
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        // min={0}
        className={styles.input}
        disabled={disabled}
        id={id}
        ref={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        type="number"
        value={value}
      />
      {userNisabEmpty && id === "userNisab" ? (
        <span className={styles.helpTip}>Nisab value is required</span>
      ) : null}
    </>
  );
};

export default Input;
