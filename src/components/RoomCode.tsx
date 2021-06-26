import copyImg from "../assets/images/copy.svg"
import "../styles/room-code.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useTheme} from "../hooks/useTheme"


type RoomCodeProps = {
    code: string;
}
const customId = "custom-id-yes";
const codeLight = () => toast("Código da sala copiado", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: customId,
});
const codeDark = () => toast.dark("Código da sala copiado", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: customId,
});

export function RoomCode(props: RoomCodeProps) {
    const {themeName} = useTheme()
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
        if (themeName === 'light') {
            codeLight()
        }
        else {
            codeDark()
        }
        

    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        <button className={`room-code ${themeName}`} title="Copiar código da sala" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code"/>
            </div>
            <span >Sala #{props.code}</span>
        </button>
        </>    
    )
}