import { Instagram, Twitter } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="w-full flex items-center justify-center border-t border-border bg-background">
      <div className="container grid md:grid-cols-3 space-y-5 md:space-y-0 items-center justify-between py-10 md:px-5">
        <div className="justify-self-start">
          <h1 className="text-4xl font-bold">BERGAS</h1>
        </div>
        <div className="flex items-center self-center justify-center">
          <Instagram className="w-6 h-6 text-primary" />
          <Twitter className="w-6 h-6 text-primary ml-4" />
        </div>
        <div className="justify-self-end">
          <span className="text-sm text-muted-foreground">
            &copy; 2024 Bergas. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
