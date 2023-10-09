import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";
import LeftBar from "@/components/shared/navbar/LeftBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative h-full w-full">
      <Navbar />
      <div className="flex">
        <LeftBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        Right sidebar
      </div>
      {/* Toaster */}
    </main>
  );
};

export default RootLayout;
