import Image from "next/image";
import { Card, CardContent } from "./ui/card";

const AboutSection = () => {
  return (
    <div id="about" className="container flex flex-col justify-center px-4 py-16">
      <Card className="xl:w-10/12 self-center shadow-lg">
        <CardContent className="flex flex-col gap-10 md:flex-row p-8 md:p-10">
          <div className="md:w-1/2 shrink-0">
            <Image
              src="/vibes/vibe-1.png"
              alt="About BarberShop"
              width={500}
              height={500}
              className="border-border rounded-xl border object-cover shadow-md w-full h-full"
            />
          </div>
          
          <div className="flex flex-col justify-between md:w-1/2 space-y-8">
            <div className="space-y-6">
              <h1 className="text-primary text-4xl md:text-5xl font-bold leading-tight">
                BERGAS BARBERSHOP
              </h1>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                <span className="font-semibold">BERGAS BARBERSHOP</span> adalah
                tempat terbaik untuk potong rambut dan perawatan pria. Kami
                menyediakan layanan berkualitas dengan tenaga profesional. Dengan
                suasana nyaman dan harga terjangkau, kami berkomitmen memberikan
                pengalaman terbaik bagi setiap pelanggan. Datang dan rasakan
                layanan istimewa kami!
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 border-t">
              <div className="text-center space-y-2">
                <h2 className="text-primary text-4xl md:text-5xl lg:text-6xl font-bold">
                  10+
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground font-medium leading-tight">
                  Tahun<br className="hidden sm:block" /> Pengalaman
                </p>
              </div>
              
              <div className="text-center space-y-2 border-x">
                <h2 className="text-primary text-4xl md:text-5xl lg:text-6xl font-bold">
                  20+
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground font-medium leading-tight">
                  Pilihan Model<br className="hidden sm:block" /> Rambut
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="text-primary text-4xl md:text-5xl lg:text-6xl font-bold">
                  2JT
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground font-medium leading-tight">
                  Pelanggan<br className="hidden sm:block" /> Puas
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
