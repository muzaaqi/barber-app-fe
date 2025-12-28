import {
  Instagram,
  Phone,
  Twitter,
  MapPin,
  Clock,
  Mail,
  Heart,
  Code,
} from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/95 border-border border-t pt-12 pb-6 backdrop-blur-sm">
      <div className="container mx-auto px-5">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 space-y-4 md:col-span-1">
            <h1 className="text-primary text-3xl font-extrabold tracking-tight">
              BERGAS
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Solusi styling rambut pria modern. Tampil percaya diri dengan
              potongan terbaik dari kapster profesional kami.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Menu</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="hover:text-primary transition-colors"
                >
                  Layanan & Harga
                </Link>
              </li>
              <li>
                <Link
                  href="/services?options=haircut"
                  className="hover:text-primary transition-colors"
                >
                  Booking Online
                </Link>
              </li>
              <li>
                <Link
                  href="/#location"
                  className="hover:text-primary transition-colors"
                >
                  Lokasi
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Hubungi Kami</h3>
            <div className="text-muted-foreground space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0" />
                <span>Jl. Daendels, Purworejo, Jawa Tengah</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Setiap Hari: 15:00 - 23:00</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Ikuti Kami</h3>
            <div className="flex gap-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="bg-secondary hover:bg-primary rounded-full p-2 transition-all duration-300 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="bg-secondary hover:bg-primary rounded-full p-2 transition-all duration-300 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:contact@bergas.com"
                className="bg-secondary hover:bg-primary rounded-full p-2 transition-all duration-300 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-border my-6 border-t"></div>
        <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-xs md:flex-row">
          <div className="text-center md:text-left">
            &copy; {currentYear} Bergas Barbershop. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Developed with</span>
            <Heart className="h-3 w-3 animate-pulse fill-red-500 text-red-500" />
            <span>by</span>
            <Link
              href="https://github.com/muzaaqi"
              target="_blank"
              className="text-foreground hover:text-primary font-medium transition-all hover:underline"
            >
              Muzaaqi
            </Link>
            <span className="text-border mx-1">|</span>
            <span
              className="flex items-center gap-1"
              title="Tech Stack: Next.js & Shadcn UI"
            >
              <Code className="h-3 w-3" /> Tech
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
