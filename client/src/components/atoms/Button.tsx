import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  to?: string; // kalau memang butuh untuk Link (tapi button biasanya nggak ada "to")
  type?: "button" | "submit" | "reset";
  action?: () => void;
  style?: "default" | "reverse" | "disabled" | "cancel";
  className?: string;
};

const Button = ({
  children,
  to,
  type = "button",
  action,
  style = "default",
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={action}
      type={type}
      // kalau ini dipakai untuk <Link>, sebaiknya pindahin logic ke komponen Link terpisah
      data-to={to} 
      className={`rounded-[10px] flex place-content-center text-center py-[7px] px-5.5 font-bold text-sm leading-[140%] tracking-[0.2px] sm:py-2.5 sm:px-6.5 sm:text-base sm:w-full 
        ${className} ${
        style === "reverse"
          ? "bg-primary-100 text-primary"
          : style === "disabled"
          ? "bg-greyscale-400 text-dark-disabled pointer-events-none"
          : style === "cancel"
          ? "bg-error-default text-light-primary"
          : "bg-primary text-light-primary"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
