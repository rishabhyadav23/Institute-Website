import { useState, useEffect } from "react";

export const useTheme = () => {
  // Check local storage or system preference
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove old class
    root.classList.remove("light", "dark");
    // Add new class
    root.classList.add(theme);
    // Save to local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};