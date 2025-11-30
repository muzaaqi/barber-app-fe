import CarouselModels from "./carousel-models";

const MenuSection = () => {
  return (
    <div id="menu" className="flex flex-col items-center justify-center py-10">
      <h1 className="font-sans text-5xl font-bold">MENU</h1>
        <CarouselModels />
      <div>
        <span className="text-muted-foreground text-xs italic md:text-sm">
          WALK-INS WELCOME / APPOINTMENTS RECOMMENDED
        </span>
      </div>
    </div>
  );
};

export default MenuSection;
