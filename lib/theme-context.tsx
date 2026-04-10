import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'github' | 'cyberpunk';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'cyberpunk',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('cyberpunk');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // Cyberpunk = dark mode, GitHub = light mode
      document.documentElement.classList.toggle('dark', theme === 'cyberpunk');
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
