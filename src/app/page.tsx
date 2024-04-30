"use client";

import { useEffect } from "react";
import Navigation from "~/components/molecules/navigation";
import { selectTheme, toggleTheme } from "~/redux/features/generalSlice";
import { useAppDispatch, useAppSelector } from "~/redux/store";

const Application = () => {
  const isDarkMode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("palette") === "dark") {
      dispatch(toggleTheme(true));
    }
  }, []);

  return (
    <main
      className={`flex h-screen overflow-hidden ${isDarkMode ? "dark" : "light"}`}
    >
      <Navigation />
    </main>
  );
};

export default Application;
