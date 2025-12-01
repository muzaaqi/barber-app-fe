import { Card, CardContent } from "./ui/card";
import SectionTitle from "./ui/text";

const LocationSection = () => {
  return (
    <div
      id="location"
      className="container flex flex-col justify-center px-4"
    >
      <SectionTitle>LOKASI KAMI</SectionTitle>
      <Card className="mx-auto w-11/12 md:w-9/10 py-0 border-primary border-2">
        <CardContent className="flex h-70 flex-col items-center md:h-100 px-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440.1599142500016!2d109.92239018303175!3d-7.842449133285149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7add001e0d0725%3A0xe3733fcaec2dd351!2sBERGAS%20BARBERSHOP!5e0!3m2!1sen!2sid!4v1764232590663!5m2!1sen!2sid"
            style={{ border: 0 }}
            height={600}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 text-sm md:text-lg">
        <div className="mt-5 flex flex-col items-end justify-center space-y-2 border-r text-center font-mono px-5">
          <h2>JALAN DAENDELS</h2>
          <h2>DEPOK REJO</h2>
          <h2>PURWOREJO</h2>
        </div>
        <div className="mt-5 flex flex-col items-start justify-center space-y-2 text-center font-mono px-5">
          <h2 className="text-muted-foreground">KAMI BUKA</h2>
          <p>SETIAP HARI</p>
          <p>15:00 - 23:00</p>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
