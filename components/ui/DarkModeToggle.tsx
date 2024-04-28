"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi2";

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme } = useTheme();
    var currentTheme = useTheme()?.theme;

    

  return (
        <Button className = "group" variant="outline" size="icon" onClick={() => {currentTheme === "dark" ? setTheme("light") : setTheme("dark")}}>
        {/* TODO: Add button Animations! */}
            <HiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 duration-200 block dark:hidden dark:rotate-90 group-hover:scale-110" />
            <HiSun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 hidden dark:block duration-200 dark:-rotate-90 group-hover:scale-110" />
        </Button>
  )
}
