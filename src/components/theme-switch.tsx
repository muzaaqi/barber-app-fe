"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Monitor, Moon, Sun } from "lucide-react";

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
    <ButtonGroup className="w-full gap-2 flex justify-center">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        onClick={() => setTheme("light")}
      >
        <Sun /> Terang
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        onClick={() => setTheme("dark")}
      >
        <Moon /> Gelap
      </Button>
    </ButtonGroup>
  );
};

export { SimpleThemeSwitch, GroupThemeSwitch, MobileThemeSwitch };
