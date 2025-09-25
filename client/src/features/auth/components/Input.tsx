type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const Input = ({ label, value, onChange, type = "text" }: InputProps) => {
  return (
    <div className="grid">
      <label
        htmlFor=""
        className="justify-self-start pb-1 pr-4 sm:text-[16px] after:ml-1 after:content-['*'] after:text-red-500"
      >
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={onChange}
        className="px-2.5 py-3 rounded-[6px] border border-other-border"
      />
    </div>
  );
};

export default Input;
