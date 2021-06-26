import {ButtonHTMLAttributes} from "react"
import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
    variableBtn?: boolean;
}

export function Button({isOutlined = false,variableBtn = false, ...props}: ButtonProps) {
    return (
        <button className={`button ${isOutlined ? 'outlined' : ''} ${variableBtn ? 'small' : ''}`}  {...props}/>
    )
} 