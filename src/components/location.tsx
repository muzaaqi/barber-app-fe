import { Card, CardContent } from "./ui/card";

const LocationSection = () => {
  return (
    <div className="container flex min-h-svh flex-col items-center justify-center py-10">
      <h1 className="font-sans text-5xl font-bold">LOCATION</h1>
      <Card className="mt-10 w-2/3">
        <CardContent className="flex flex-col items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440.1599142500016!2d109.92239018303175!3d-7.842449133285149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7add001e0d0725%3A0xe3733fcaec2dd351!2sBERGAS%20BARBERSHOP!5e0!3m2!1sen!2sid!4v1764232590663!5m2!1sen!2sid"
            height={450}
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </CardContent>
      </Card>
      <div className="mt-10 flex flex-col items-center justify-center space-y-2 border-b text-center font-mono">
        <h2>RAMBUTAN STREET</h2>
        <h2>CENTRAL JAVA</h2>
        <h2>INDONESIA</h2>
      </div>
      <div className="mt-5 flex flex-col items-center justify-center space-y-2 text-center font-mono">
        <h2 className="text-muted-foreground">HOURS</h2>
        <p>MON-SAT: 09:00 - 20:00</p>
        <p>SUN: 10:00 - 18:00</p>
      </div>
    </div>
  );
};

export default LocationSection;
