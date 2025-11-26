import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      title: "Kids Haircut (12 & under)",
      price: "$20",
    },
    {
      title: "Senior Haircut (65 & over)",
      price: "$20",
    },
  ];
  return (
    <div className="container flex min-h-svh flex-col items-center justify-center py-10">
      <h1 className="font-sans text-5xl font-bold">Menu</h1>
      <Card className="mt-10 w-2/3">
        <CardContent className="font-mono font-bold space-y-3">
          {menuItems.map(({title, price}) => (
            <div key={title} className="flex justify-between py-2 border-b border-border">
              <span>{title.toUpperCase()}</span>
              <span className="text-primary">{price}</span>
            </div>
          ))}
          <div>
            <span className="italic text-sm text-muted-foreground">WALK-INS WELCOME / APPOINTMENTS RECOMMENDED</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuSection;
