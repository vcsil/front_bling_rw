import { createContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

interface ThemeColors {
    primary: string;
    secondary: string;
    border: string;
}

interface ThemeProviderState {
    theme: Theme;
    setTheme: (_theme: Theme) => void;
    colors: ThemeColors;
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
    colors: ColorsDefaultByTheme("light"),
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function ColorsDefaultByTheme(themeName: string): ThemeColors {
    switch (themeName) {
        case "light":
            return {
                primary: "#18181b",
                secondary: "#f4f4f5",
                border: "#27272a", //"#e4e4e7",
            };
        case "dark":
            return {
                primary: "#f4f4f5",
                secondary: "#18181b",
                border: "#e4e4e7",
            };
        default:
            // eslint-disable-next-line no-case-declarations
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            return ColorsDefaultByTheme(systemTheme);
    }
}

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
        colors: ColorsDefaultByTheme(theme),
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}
