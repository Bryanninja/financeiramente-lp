// src/components/ui/Button.tsx
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "accent" | "black" | "white";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-4 rounded-lg cursor-pointer font-semibold text-sm md:text-base transition-all duration-300 active:scale-95";

  const variants = {
    primary: "bg-primary-deep hover:bg-blue-950 text-light",
    black:
      "bg-dark hover:bg-black text-white rounded-md font-bold text-base transition-all w-full md:w-fit",
    white: "bg-white hover:bg-neutral-100 text-dark",
    outline: "border-2 border-dark hover:bg-dark hover:text-light shadow-none",
    accent: "bg-accent-bronze hover:bg-amber-700 text-light",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
