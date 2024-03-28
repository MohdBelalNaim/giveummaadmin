const Input = ({ type = "text", name, label, register, value }) => {
  return (
    <input
      type={type}
      {...register(name)}
      placeholder={label}
      className="p-3 border w-full rounded"
      value={value}
    />
  );
};

export default Input;
