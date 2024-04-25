"use client";

import { useSelector } from "react-redux";
import { Button } from "~/components/atoms/button";
import { selectTheme } from "~/redux/features/generalSlice";

const Application = () => {
  const isDarkMode = useSelector(selectTheme);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${isDarkMode ? "dark" : "light"}`}
    >
      <Button>Invinio</Button>
    </main>
  );
};

export default Application;
