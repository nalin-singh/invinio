"use client";

import Link from "next/link";
import { Button } from "~/components/atoms/button";

const Application = () => {
  return (
    <main className={`flex h-screen overflow-hidden`}>
      <div className="m-auto flex flex-col gap-2 text-center">
        <p className="text-4xl font-bold">Invinio</p>
        <p className="text-xl">Inventory and Invoice Management System</p>
        <Link href="/dashboard">
          <Button>Get Started</Button>
        </Link>
      </div>
    </main>
  );
};

export default Application;
