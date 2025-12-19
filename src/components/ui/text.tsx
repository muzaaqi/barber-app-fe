import React from "react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-5 flex items-center justify-center gap-4">
      <h1 className="text-4xl font-bold xl:text-5xl">{children}</h1>
    </div>
  );
};
export default SectionTitle;
