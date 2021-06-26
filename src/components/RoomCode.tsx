import copyImg from "../assets/images/copy.svg"
import "../styles/room-code.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type RoomCodeProps = {
    code: string;
}
const customId = "custom-id-yes";
const code = () => toast("Código da sala copiado", {
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
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
        code()

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
        <button className="room-code" title="Copiar código da sala" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code"/>
            </div>
            <span >Sala #{props.code}</span>
        </button>
        </>    
    )
}