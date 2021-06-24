//import { useState} from "react"
import {useHistory, useParams} from "react-router-dom"

import logoImg from "../assets/images/logo.svg"
import deleteImg from "../assets/images/delete.svg"
import { Button } from "../components/Button"
import { Question } from "../components/Question"
import { RoomCode } from "../components/RoomCode"
//import { useAuth } from "../hooks/useAuth"
import { useRoom } from "../hooks/useRoom"
import "../styles/room.scss"
import { database } from "../services/firebase"





type RoomParams = {
    id: string;
}

export function AdminRoom() {
    //const { user } = useAuth()
    const params = useParams<RoomParams>();
    const roomId = params.id
    const history = useHistory();
    const {questions, title} = useRoom(roomId)

    async function handleEndRoom(roomId: string) {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date,
        })
        history.push('/')
    }

    async function handleDeleteQuestion(quesionId: string) {
        if (window.confirm("Você tem certeza que deseja remover essa pergunta?")) {
            const questionRef = await database.ref(`rooms/${roomId}/questions/${quesionId}`).remove()
        }
    }
    
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={()=> handleEndRoom(roomId)}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta{questions.length > 1 && "s"}</span>}
                    
                </div>

                <div className="question-list">
                {questions.map(question => {
                    return (
                        <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                        >
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta"/>
                            </button>
                        </Question>
                    )
                })}
                </div>
            </main>
        </div>
    )
}