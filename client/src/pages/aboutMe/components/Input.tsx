interface InputProps {
  id: string;
  type: string;
  value?: string | number;
  children: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  type,
  value,
  children,
  className,
  onChange,
}: InputProps) => {
  return (
    <div className={`relative ${className || ""}`}>
      <input
        type={type}
        value={value}
        id={id}
        onChange={onChange}
        className={`peer w-full h-[49px] px-3 border border-gray-300 rounded-[10px] focus:outline-none focus:border-primary`}
      />
      <label
        htmlFor=""
        className="peer-focus:text-primary absolute left-3 -top-2 px-[5px] text-sm font-medium text-gray-500 bg-white transition-all"
      >
        {children}
      </label>
    </div>
  );
};

export default Input;
