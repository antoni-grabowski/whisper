"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function ModeToggle({ className = "" }: { className: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      onClick={() =>
        resolvedTheme == "light" ? setTheme("dark") : setTheme("light")
      }
      variant={"outline"}
      className={className}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-0" />
    </Button>
  );
}
