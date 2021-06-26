import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext"

export function useTheme() {
    const { themeName, changeTheme } = useContext(ThemeContext)
    return { themeName, changeTheme }
}
