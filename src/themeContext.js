import React, { createContext, useContext, useState } from "react";

// Create a context for the theme
const ThemeContext = createContext();

// Create a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  // Define states for the theme and the function to toggle it
  const [theme, setTheme] = useState("light");

  // Function to toggle the theme
  const toggleTheme = () => {
    console.log(theme);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Pass the theme state and toggle function to the context provider
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
