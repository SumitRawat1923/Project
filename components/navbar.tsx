"use client";
import React from "react";
import MainNavbar from "./main-navbar";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function Navbar() {
  return (
    <div className="border">
      <div className="flex items-center h-16 px-4">
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-orange-300 to-indigo-600 text-transparent bg-clip-text">
          VH
        </h1>
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
