import { useEffect, useState } from "react"
import Answer from "./Answer"
import { decode } from 'html-entities'

export default function QuizElement(props) {
    const [answersArr, setAnswersArr] = useState([])

    useEffect(() => {
        let array = []
        array.push({ answer: props.correctAnswer, correct: true })
        props.incorrectAnswer.forEach(answer => array.push({ answer: answer, correct: false }))
        array.sort(() => Math.random() - 0.5)

        setAnswersArr(array)

    }, [props.question])

    const answerEl = answersArr.map((answer, index) => (
        <Answer
            id={props.id}
            key={index}
            answer={decode(answer.answer)}
            correct={answer.correct}
            isCheckAnswers={props.isCheckAnswers}
            scoreCount={props.scoreCount}
        />
    ))

    return (
        <div className="quiz-element">
            <h4>{decode(props.question)}</h4>
            <div className="answers">{answerEl}</div>
            <div className="line"></div>
        </div>
    )
}