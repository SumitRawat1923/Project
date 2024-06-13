"use client";
import React from "react";
import MainNavbar from "./main-navbar";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

async function Navbar() {
  return (
    <div className="border">
      <div className="flex items-center h-16 px-4">
        <h1 className="text-4xl font-semibold">LOGO</h1>
        <MainNavbar className="ml-6" />
        <div className="flex items-center space-x-4 ml-auto">
          <ModeToggle />
          <Button
            onClick={async () => {
              await signOut();
            }}
            variant={"destructive"}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
