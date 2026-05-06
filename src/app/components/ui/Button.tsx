// src/components/ui/Button.tsx
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "accent";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-4 rounded-md cursor-pointer font-semibold text-sm md:text-base transition-all duration-300 shadow-lg active:scale-95";

  const variants = {
    primary: "bg-primary-deep hover:bg-primary-vibrant text-light",
    outline:
      "border-2 border-dark hover:bg-primary-deep hover:text-light shadow-none",
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
