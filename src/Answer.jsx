import {useId, useEffect, useState} from "react"

export default function Answer(props) {
    const id = useId()
    const [isDisabled, setIsDisabled] = useState(false)
    
    // change color for checked buttons red for incorect green for correct
    function setAnswersStyle() {
        if (props.correct) {
            return "check-answers correct"
        } else {
            return "check-answers incorrect"
        }
    }

    useEffect(() => {
        props.isCheckAnswers && setIsDisabled(true)
    },[props.isCheckAnswers])

    return (
        <div className="answerBtn">
            <input
                type="radio"
                id={id}
                name={props.id}
                value={props.correct}
                onChange={props.scoreCount}
                disabled={isDisabled}
            />
            <label htmlFor={id} className={props.isCheckAnswers ? setAnswersStyle() : ''} >
                {props.answer}
            </label>
        </div>
       
    )
}