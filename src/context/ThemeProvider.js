import { React, useState } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
  const dark = {
    name: 'dark',
    primary: 'dark-primary',
    secondary: 'dark-secondary',
    background: 'dark-bg',
    color: 'dark-text-primary',
    colorSecondary: 'text-secondary',
  };
  const light = {
    name: 'light',
    primary: 'light-primary',
    secondary: 'light-secondary',
    background: 'light-bg',
    color: 'light-text-primary',
    colorSecondary: 'text-secondary',
  };
  const [mode, setMode] = useState(dark);
  const changeMode = () => {
    setMode((prevMode) => (prevMode.name === 'dark' ? light : dark));
  };
  const theme = {
    mode,
    changeMode,
  };
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
