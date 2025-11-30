import { Instagram, Twitter } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-border bg-background flex w-full items-center justify-center border-t">
      <div className="container grid items-center justify-center space-y-5 py-10 md:grid-cols-3 md:space-y-0 md:px-5">
        <div className="flex justify-center md:justify-self-start">
          <h1 className="text-4xl font-bold">BERGAS</h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Instagram className="text-primary h-6 w-6" />
          <Twitter className="text-primary h-6 w-6" />
        </div>
        <div className="md:justify-self-end">
          <span className="text-muted-foreground text-sm">
            &copy; 2024 Bergas. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
