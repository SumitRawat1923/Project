"use client";

import Clock from "@/components/clock";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full  bg-black text-white">
      <div className="flex flex-col items-center justify-center p-10 rounded-lg bg-gradient-to-r from-blue-900 via-black to-blue-900 shadow-xl">
        <Clock />
      </div>
      <div className="flex flex-col items-center justify-center text-white text-center p-6">
        <h1 className=" md:text-6xl text-5xl font-bold mb-4 bg-gradient-to-r from-orange-300 to-indigo-600 text-transparent bg-clip-text">
          Create, Customize, Control.
        </h1>
        <p className="text-2xl mb-6 max-w-2xl">
          Effortlessly create, customize, and manage your website on a powerful,
          all-in-one platform.
        </p>
      </div>
    </div>
  );
}
