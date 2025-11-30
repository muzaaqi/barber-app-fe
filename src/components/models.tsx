import CarouselModels from "./carousel-models";

const ModelsSection = () => {
  return (
    <div id="models" className="flex flex-col items-center justify-center py-10">
      <h1 className="font-sans text-5xl font-bold">MODELS</h1>
        <CarouselModels />
      <div>
        <span className="text-muted-foreground text-xs italic md:text-sm">
          WALK-INS WELCOME / APPOINTMENTS RECOMMENDED
        </span>
      </div>
    </div>
  );
};

export default ModelsSection;
