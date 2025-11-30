import { ArrowRight } from "lucide-react";
import CarouselModels from "./carousel-models";
import { Button } from "./ui/button";

const ModelsSection = () => {
  return (
    <div id="models" className="flex flex-col items-center justify-center py-10">
      <h1 className="font-sans text-5xl font-bold">MODELS</h1>
        <CarouselModels />
      <div className="grid justify-items-center gap-3 mt-5">
        <span className="text-muted-foreground text-xs italic md:text-sm">
          WALK-INS WELCOME / APPOINTMENTS RECOMMENDED
        </span>
        <Button className="w-fit text-lg">Lihat Semua<ArrowRight /></Button>
      </div>
    </div>
  );
};

export default ModelsSection;
