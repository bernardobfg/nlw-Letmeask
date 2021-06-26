import { useState} from "react"
import {useHistory, useParams} from "react-router-dom"

import logo1 from "../assets/images/logo.svg"
import logo2 from "../assets/images/logo2.svg"
import deleteImg from "../assets/images/delete.svg"
import { Button } from "../components/Button"
import { ToggleBtn } from "../components/ToggleBtn"
import { Question } from "../components/Question"
import { RoomCode } from "../components/RoomCode"
import { useRoom } from "../hooks/useRoom"
import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"
import "../styles/room.scss"
import { database } from "../services/firebase"
import { useEffect } from "react"





type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth()
    const {themeName} = useTheme()
    const params = useParams<RoomParams>();
    const roomId = params.id
    const history = useHistory();
    const { questions, title, roomAuthorId } = useRoom(roomId)
    const [orderedQuestions, setOrderedQuestions] = useState(questions)
    const [logoImg, setLogoImg] = useState('')

    async function handleEndRoom(roomId: string) {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date,
        })
        history.push('/')
    }

    async function handleDeleteQuestion(quesionId: string) {
        if (window.confirm("Você tem certeza que deseja remover essa pergunta?")) {
            const questionRef = await database.ref(`rooms/${roomId}/questions/${quesionId}`).remove()
            console.log(questionRef)
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string, isAnswered: boolean) {
        const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: !isAnswered,
            isHighlighted: false
        })
        
    }

    async function handleHighlightQuestion(questionId: string, isHeighlighted: boolean) {
        const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: !isHeighlighted,
        }) 
    }

    useEffect(() => {
        if (roomAuthorId !== user?.id && roomAuthorId !== '') {
            history.push(`/rooms/${roomId}`)
        }
    }, [user, roomAuthorId])
    
    useEffect(() => {
        if (themeName === 'light') {
            setLogoImg(logo1)
        }
        else {
            setLogoImg(logo2) 
        }
        
        

    }, [themeName])

    useEffect(() => {
        
        setOrderedQuestions(
            questions.sort((a, b) => {
                if (a.isAnswered && !b.isAnswered) {
                    return(1)
                }
                if (!a.isAnswered && b.isAnswered) {
                    return(-1)
                }

                if (a.isHighlighted && !b.isHighlighted) {
                    return(-1)
                }
                if (!a.isHighlighted && b.isHighlighted) {
                    return(1)
                }
                return(b.likeCount - a.likeCount)
            })
        )
    }, [questions])
    
    return (
        <div id="page-room" className={themeName}>
            <header>
                <div className="content">
                    <img onClick={() => history.push('/')} src={logoImg} alt="Letmeask" />
                    <div>
                        <span>
                        <ToggleBtn/>
                            <RoomCode code={roomId} />
                            
                        </span>
                        
                        <Button  isOutlined onClick={()=> handleEndRoom(roomId)}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1 className={themeName}>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta{questions.length > 1 && "s"}</span>}
                    
                </div>
                
                <div className="question-list">
                {questions.length === 0 && 
                    <h2 className={themeName}>Ainda não existem perguntas nessa sala</h2>
                }
                {orderedQuestions.map(question => {
                    return (
                        <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            isAnswered={question.isAnswered}
                            isHighlighted={question.isHighlighted}
                            likeCount = {question.likeCount}
                        >
                            
                            
                            <button
                                type="button"
                                onClick={() => handleCheckQuestionAsAnswered(question.id, question.isAnswered)}
                                className={`${question.isAnswered && 'clicked'}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                            </button>
                            {!question.isAnswered &&
                                <>
                                    <button
                                        type="button"
                                        className={`${question.isHighlighted && 'clicked'}`}
                                        onClick={() => handleHighlightQuestion(question.id, question.isHighlighted)}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </button>
                                </>}



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