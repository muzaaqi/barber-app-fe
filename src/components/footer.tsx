import { Instagram, Twitter } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="w-full flex items-center justify-center border-t border-border bg-background">
      <div className="container flex items-center justify-between py-10">
        <div>
          <h1 className="text-4xl font-bold">BERGAS</h1>
        </div>
        <div className="flex items-center">
          <Instagram className="w-6 h-6 text-primary" />
          <Twitter className="w-6 h-6 text-primary ml-4" />
        </div>
        <div>
          <span className="text-sm text-muted-foreground">
            &copy; 2024 Bergas. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
