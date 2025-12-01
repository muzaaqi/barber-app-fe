import { ArrowRight } from "lucide-react";
import CarouselModels from "./carousel-models";
import { Button } from "./ui/button";
import SectionTitle from "./ui/text";

const ModelsSection = () => {
  return (
    <div id="models" className="z-2 container flex flex-col justify-center">
      <div className="px-4">
        <SectionTitle>MODEL POTONGAN</SectionTitle>
      </div>
      <CarouselModels />
      <div className="mt-3 grid justify-items-center gap-3">
        <Button className="text-md w-fit">
          LIHAT SEMUA
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ModelsSection;
