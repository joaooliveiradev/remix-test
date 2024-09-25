import { cn } from "~/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn("p-6 border rounded-xl shadow-sm bg-white", className)}>
      {children}
    </div>
  );
};

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn("flex flex-col items-start", className)}>{children}</div>
  );
};

export { Card, CardContent };
