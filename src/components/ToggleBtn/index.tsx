import {FormEvent} from 'react'
import { useTheme } from "../../hooks/useTheme"

import "./styles.scss"

export function ToggleBtn() {
    const { themeName, changeTheme } = useTheme()
    const changeThemeName = (event: FormEvent) => {
        event.preventDefault()
        changeTheme(themeName === 'dark'? "light": "dark")
    }

    return (
        <span className="toggleContainer">
            <button
                onClick={(event) => changeThemeName(event)}
                className={`${themeName === "light" ? "light" : "dark"}`}
                title={`${themeName === 'light'? "Dark": "Light"} mode`}
            >
            <span>

            </span>
            </button>
        </span>
    )
}