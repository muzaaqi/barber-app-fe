import React from "react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-5 flex items-center gap-4">
      <div className="bg-primary size-6 lg:size-8 xl:size-10"></div>
      <h1 className="text-xl font-bold lg:text-2xl xl:text-4xl">{children}</h1>
    </div>
  );
};

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`justify-center container ${className}`}>{children}</div>;
};

const SectionContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`mt-5 ${className}`}>{children}</div>;
};

export default SectionTitle;
