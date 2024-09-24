type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">{children}</div>
  );
};

type CardContentProps = {
  children: React.ReactNode;
};

const CardContent = ({ children }: CardContentProps) => {
  return <div className="flex flex-col items-start">{children}</div>;
};

export { Card, CardContent };
