import {ReactNode} from 'react'
import "./styles.scss"

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isHighlighted?: boolean,
    isAnswered?: boolean,
    likeCount?: number,
}

export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,
    likeCount = undefined,
}: QuestionProps) {
    return (
        <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted && !isAnswered ? 'hightlighted' : ''}`}>
            <div className="content">
                <p>{content} </p>
                {
                    likeCount ? (
                        <span>{`${likeCount} curtida(s)`}</span>
                    ): ''
                }
            </div>
            
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>

    )
}