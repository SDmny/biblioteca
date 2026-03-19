function TypeInput({
  type,
  name = "",
  placeholder = "",
  value = "",
  onChange = "",
  required = false,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}

export default TypeInput;
