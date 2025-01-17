import React, {createContext, ReactNode, useCallback, useContext, useMemo, useState} from "react";
import {getGlobalTheme, getNextTheme, setGlobalTheme, Theme} from "./themes.ts";

interface ThemeContextValue {
    getTheme: () => Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeContextProviderProps {
    children: ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({children}) => {
    const [theme, setThemeState] = useState<Theme>(getGlobalTheme());

    // Needed to change global theme and local theme (state)
    const setThemeHandler = useCallback((newTheme: Theme) => {
        setGlobalTheme(newTheme);
        setThemeState(newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        const newTheme: Theme = getNextTheme(theme);
        setThemeHandler(newTheme);
        return newTheme;
    }, [theme, setThemeHandler]);

    const contextValue = useMemo(
        () => ({
            getTheme: () => theme,
            setTheme: setThemeHandler,
            toggleTheme,
        }),
        [theme, setThemeHandler, toggleTheme]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
const useThemeContext = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useThemeContext must be used within a ThemeContextProvider");

    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export {ThemeContextProvider, useThemeContext};
