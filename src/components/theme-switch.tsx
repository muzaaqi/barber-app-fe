"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Monitor, Moon, Palette, Sun } from "lucide-react";

const SimpleThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
};

const GroupThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <ButtonGroup>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        onClick={() => setTheme("system")}
      >
        <Monitor />
      </Button>
      <Button
        variant={theme === "light" ? "default" : "outline"}
        onClick={() => setTheme("light")}
      >
        <Sun />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        onClick={() => setTheme("dark")}
      >
        <Moon />
      </Button>
    </ButtonGroup>
  );
};

const MobileThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex w-full items-center justify-between gap-2 pl-2">
      <div className="flex items-center text-sm gap-2">
        <Palette size={16} className="text-muted-foreground" /> Tema
      </div>
      <ButtonGroup className="flex w-full justify-center">
        <Button
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
        >
          <Sun />
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
        >
          <Moon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export { SimpleThemeSwitch, GroupThemeSwitch, MobileThemeSwitch };
