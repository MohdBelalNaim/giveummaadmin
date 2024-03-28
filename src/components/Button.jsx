const Button = ({ type, children, width, onClick, size, submit = false }) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`
      max-sm:text-sm
       rounded-full gap-1 font-[500] text-gray-50 bg-black flex justify-center items-center active:scale-95 transition-transform
      ${width === "full" && "w-full"}
      ${type === "primary" && "primary"}
      ${size === "md" ? "px-7 py-2" : "py-3 px-6"}
      ${
        type === "outline" &&
        "border border-primary text-primary bg-transparent border-primary-hover"
      }
      ${type === "text" && "underline text-primary py-0 px-0 bg-transparent"}
        `}
    >
      {children}
    </button>
  );
};

export default Button;
