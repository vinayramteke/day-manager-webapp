//  * COMPONENT: Button
//  * FILE: src/components/atoms/Button.jsx

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled,
  ...props
}) => {
  const base =
    "font-bold rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 shadow-md",
    secondary: "bg-white text-black border border-gray-200 hover:bg-gray-50",
    danger: "bg-white text-red-500 border border-red-200 hover:bg-red-50",
    ghost: "text-gray-400 hover:text-black hover:bg-gray-100 p-2 rounded-full",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
