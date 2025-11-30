import { ArrowRight } from "lucide-react";
import CarouselModels from "./carousel-models";
import { Button } from "./ui/button";
import SectionTitle from "./ui/text";

const ModelsSection = () => {
  return (
    <div id="models" className="flex flex-col justify-center py-10 container z-2">
      <div className="px-4 md:px-0">
        <SectionTitle>MODEL POTONGAN</SectionTitle>
      </div>
      <CarouselModels />
      <div className="mt-3 grid justify-items-center gap-3">
        <Button className="w-fit text-md">
          LIHAT SEMUA
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ModelsSection;
