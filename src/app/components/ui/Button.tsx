import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

// Estendemos as propriedades normais de botão e adicionamos href e target
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "accent" | "black" | "white";
  href?: string;
  target?: string;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  target,
  ...props
}: ButtonProps) {
  // Adicionei inline-block e text-center para garantir que funcione bem como link
  const baseStyles =
    "inline-block text-center px-6 py-4 rounded-lg cursor-pointer font-semibold text-sm md:text-base transition-all duration-300 active:scale-95";

  const variants = {
    primary: "bg-primary-deep hover:bg-blue-950 text-light",
    black:
      "bg-dark hover:bg-black text-white rounded-lg font-bold text-base transition-all w-full md:w-fit",
    white: "bg-white hover:bg-neutral-100 text-dark",
    outline: "border-2 border-dark hover:bg-dark hover:text-light shadow-none",
    accent: "bg-accent-bronze hover:bg-amber-700 text-light",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  // Se tiver href, renderizamos como link
  if (href) {
    // Se for link externo (WhatsApp) ou tiver target="_blank"
    if (href.startsWith("http") || target === "_blank") {
      return (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }

    // Se for link interno (ex: /diagnostico), usamos o Link otimizado do Next.js
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  // Se NÃO tiver href, renderiza um botão normal (para formulários, onClick, etc)
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
