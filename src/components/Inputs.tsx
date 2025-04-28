import Input from "./Input.js";

const Inputs = ({
  data,
  inputRef,
  isNegative,
  loadingGoldValue,
  nisabError,
  onChange,
  onBlur,
  userNisabEmpty,
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
          field.id === "userNisab" && nisabError
            ? "1. Enter your own nisab value (required)"
            : field.label
        }
        onChange={(evt: { target: { id: any; value: any } }) =>
          onChange(evt.target.id, Number(evt.target.value))
        }
        userNisabEmpty={userNisabEmpty}
        value={!loadingGoldValue && field.value}
        onBlur={(evt) => onBlur(evt, field.id)}
      />
    );
  });
};

export default Inputs;
