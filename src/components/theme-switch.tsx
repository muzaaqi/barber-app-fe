"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Moon, Sun } from "lucide-react";

const ThemeSwitch = () => {
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

const MobileThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <ButtonGroup className="w-full">
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

export { ThemeSwitch, MobileThemeSwitch };
