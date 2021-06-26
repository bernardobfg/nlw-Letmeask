import { createContext, ReactNode, useState} from "react"


type ThemeContextType = {
    themeName: string,
    changeTheme: any;
}

type ThemeContextProviderProps = {
    children: ReactNode
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
    const [themeName, setThemeName] = useState(localStorage.getItem('theme') ?? 'light')
    function changeTheme(theme: string) {
        setThemeName(theme)
        localStorage.setItem('theme', theme)
    }

    return (
        <ThemeContext.Provider value={{themeName, changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}