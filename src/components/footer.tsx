import { Instagram, Phone, Twitter } from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className="border-border bg-background flex w-full items-center justify-center border-t">
      <div className="container grid items-center justify-center space-y-5 py-10 md:grid-cols-3 md:space-y-0 md:px-5">
        <div className="flex justify-center md:justify-self-start">
          <h1 className="text-4xl font-bold">BERGAS</h1>
        </div>
        <div className="flex items-center justify-center gap-7">
          <Link
            href="https://www.instagram.com/bergas_barbershop/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="text-primary h-6 w-6" />
          </Link>
          <Link
            href="https://twitter.com/bergas_barbershop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="text-primary h-6 w-6" />
          </Link>
          <Link href="tel:+621234567890">
            <Phone className="text-primary h-6 w-6" />
          </Link>
        </div>
        <div className="md:justify-self-end">
          <span className="text-muted-foreground text-sm">
            &copy; 2025 Bergas. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
