// src/components/ui/Container.tsx
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-6 md:px-16 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
}
