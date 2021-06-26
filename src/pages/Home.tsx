import {useEffect} from 'react'
import { useHistory } from "react-router-dom"
import illustrationImg from "../assets/images/illustration.svg";
import logo1 from "../assets/images/logo.svg";
import logo2 from "../assets/images/logo2.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss"
import { Button } from "../components/Button";
import { ToggleBtn } from "../components/ToggleBtn";

import { useAuth } from "../hooks/useAuth"
import {useTheme} from "../hooks/useTheme"
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')
    const { themeName } = useTheme();
    const [logoImg, setLogoImg] = useState('')

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push("/rooms/new")
    }
    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()
        if (roomCode.trim() === '') {
            return;
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        if (!roomRef.exists()) {
            alert("Room does not exists");
            return;
        }
        if (roomRef.val().endedAt) {
            alert("Room already closed")
            return;
        }
        history.push(`/rooms/${roomCode}`)
    }

    useEffect(() => {
        if (themeName === 'light') {
            setLogoImg(logo1)
        }
        else {
            setLogoImg(logo2) 
        }
        
        

    }, [themeName])

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main className={themeName}>
                <div className="main-content">
                    <div className="logo-div">
                        <img src={logoImg} alt="Letmeask" />
                        <ToggleBtn/>
                    </div>
                    
                    
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={event=>handleJoinRoom(event)}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                            className={themeName}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}