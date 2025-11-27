import { Card, CardContent } from "@/components/ui/card";

const MenuSection = () => {
  const menuItems = [
    {
      title: "Classic Haircut",
      price: "$25",
    },
    {
      title: "Beard Trim",
      price: "$15",
    },
    {
      title: "Hot Towel Shave",
      price: "$30",
    },
    {
      title: "Haircut & Beard Combo",
      price: "$35",
    },
    {
      title: "Kids Haircut",
      price: "$20",
    },
    {
      title: "Senior Haircut",
      price: "$20",
    },
  ];
  return (
    <div
      id="menu"
      className="container flex min-h-svh flex-col items-center justify-center py-10"
    >
      <h1 className="font-sans text-5xl font-bold">MENU</h1>
      <Card className="mt-10 w-10/12 md:w-2/3">
        <CardContent className="space-y-3 font-mono font-bold">
          {menuItems.map(({ title, price }) => (
            <div
              key={title}
              className="border-border flex justify-between border-b py-2 text-sm md:text-base"
            >
              <span>{title.toUpperCase()}</span>
              <span className="text-primary">{price}</span>
            </div>
          ))}
          <div>
            <span className="text-muted-foreground text-xs italic md:text-sm">
              WALK-INS WELCOME / APPOINTMENTS RECOMMENDED
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuSection;
