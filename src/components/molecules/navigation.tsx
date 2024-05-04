"use client";

import Link from "next/link";
import { Package2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../atoms/tooltip";
import paths from "~/lib/paths";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  const isSelected = (path: string) => {
    if (pathname === path) {
      return "bg-primary text-white";
    }
    return "text-muted-foreground";
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Invinio</span>
          </Link>
          {paths.map((item) => (
            <Tooltip key={item.path}>
              <TooltipTrigger asChild>
                <Link
                  href={item.path}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${isSelected(item.path)} transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <item.icon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <UserButton />
                <span className="sr-only">Profile</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Profile</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </>
  );
};

export default Navigation;
