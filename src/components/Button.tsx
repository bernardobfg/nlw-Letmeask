import { ButtonHTMLAttributes } from "react"
import {useTheme} from "../hooks/useTheme"
import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
    variableBtn?: boolean;
}

export function Button({ isOutlined = false, variableBtn = false, ...props }: ButtonProps) {
    const {themeName} = useTheme()
    return (
        <button className={`button ${isOutlined ? themeName : ''} ${variableBtn ? 'small' : ''}`}  {...props}/>
    )
} 