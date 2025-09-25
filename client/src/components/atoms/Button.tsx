import type { ReactNode } from "react";
import { Link } from "react-router";

type ButtonProps = {
  children: ReactNode;
  to?: string; // kalau memang butuh untuk Link (tapi button biasanya nggak ada "to")
  href?: string;
  type?: "button" | "submit" | "reset";
  action?: () => void;
  style?: "default" | "reverse" | "disabled" | "cancel";
  className?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  to,
  href,
  type = "button",
  action,
  style = "default",
  className = "",
  disabled,
}: ButtonProps) => {
  return (
    <>
      {disabled ? (
        <button
          type={type}
          disabled
          className="w-full flex place-content-center text-center py-[7px] sm:py-2.5 px-5.5 sm:px-6.5 font-bold text-sm sm:text-base rounded-[10px] leading-[140%] tracking-[0.2px] bg-greyscale-400 text-dark-disabled"
        >
          {children}
        </button>
      ) : href ? (
        <a
          href={href}
          className="w-full flex place-content-center text-center py-[7px] sm:py-2.5 px-5.5 sm:px-6.5 font-bold text-sm sm:text-base rounded-[10px] leading-[140%] tracking-[0.2px] bg-primary text-light-primary"
        >
          {children}
        </a>
      ) : to ? (
        <Link
          to={to ?? ""}
          className="w-full flex place-content-center text-center py-[7px] sm:py-2.5 px-5.5 sm:px-6.5 font-bold text-sm sm:text-base rounded-[10px] leading-[140%] tracking-[0.2px] bg-primary text-light-primary"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={action}
          type={type}
          className={`w-full flex place-content-center text-center py-[7px] sm:py-2.5 px-5.5 sm:px-6.5 font-bold text-sm sm:text-base rounded-[10px] leading-[140%] tracking-[0.2px] ${className} ${
            style === "reverse"
              ? "bg-primary-100 text-primary"
              : style === "cancel"
              ? "bg-error-default text-light-primary"
              : "bg-primary text-light-primary"
          }`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
