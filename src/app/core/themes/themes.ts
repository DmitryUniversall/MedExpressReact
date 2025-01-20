enum Theme {
    Dark = "dark",
    Light = 'light'
}

const DEFAULT_THEME: Theme = Theme.Dark;
const THEME_STORAGE_KEY: string = 'color-theme';


function _getLocalStorageTheme(): Theme | null {
    const theme: string | null = localStorage.getItem(THEME_STORAGE_KEY);
    return Object.values(Theme).includes(theme as Theme) ? Theme[theme as keyof typeof Theme] : null;
}


function _setLocalStorageTheme(theme: Theme): void {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}


function _getCurrentTheme(): Theme | null {
    const theme: string | null = document.documentElement.getAttribute('data-theme')
    return Object.values(Theme).includes(theme as Theme) ? Theme[theme as keyof typeof Theme] : null
}


function _setCurrentTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
}


function getGlobalTheme(): Theme {
    let theme: Theme | null = _getCurrentTheme() ?? _getLocalStorageTheme();

    if (!theme) {
        setGlobalTheme(DEFAULT_THEME)
        theme = DEFAULT_THEME
    }

    return theme;
}


function setGlobalTheme(theme: Theme): void {
    _setCurrentTheme(theme)
    _setLocalStorageTheme(theme)
}


function getNextTheme(currentTheme: Theme): Theme {
    const themes: Theme[] = Object.values(Theme);

    const currentIndex: number = themes.indexOf(currentTheme);
    if (currentIndex === -1) throw new Error(`Unable to get next theme: invalid theme: ${ currentTheme }`);

    return themes[(currentIndex + 1) % themes.length] as Theme;
}


document.documentElement.setAttribute('data-theme', getGlobalTheme());


export {
    Theme,
    DEFAULT_THEME,
    getGlobalTheme,
    setGlobalTheme,
    getNextTheme
}
