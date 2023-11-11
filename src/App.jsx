import { useState, useEffect } from 'react'

import './App.css'
import FirstScreen from './FirstScreen'
import QuizElement from './QuizElement'

function App() {
  const [isStart, setIsStart] = useState(false)
  const [quiz, setQuiz] = useState([])
  const [isNewGame, setIsNewGame] = useState(false)
  const [isCheckAnswers, setIsCheckAnswers] = useState(false)
  const [countAnswers, setCountAnswers] = useState(0)
  const [answersIdArr, setAnswersIdArr] = useState([])
  const [category, setCategory] = useState("")


  useEffect(() => {
    let quizArr = []
    isStart && fetch(`https://opentdb.com/api.php?amount=5${category}`)
      .then(res => res.json())
      .then(data => {
        quizArr = data.results.map(item => {
          return {
            question: item.question,
            correctAnswer: item.correct_answer,
            incorrectAnswer: item.incorrect_answers
          }
        })
        setQuiz(quizArr)
      })
  }, [isStart])

  useEffect(() => {
    setAnswersIdArr([])
  }, [isStart])

  function selectCategory(e) {
    const selectedCategory = e.target.value.length > 0 ? `&category${e.target.value}` : ''
    setCategory(selectedCategory)
  }


  function startQuiz() {
    setIsStart(prevState => !prevState)
  }

  function checkAnswers() {
    setIsCheckAnswers(prevState => !prevState)
    showNewGameBtn()
  }

  function showNewGameBtn() {
    setIsNewGame(prevState => !prevState)
  }

  function scoreCount(e) {
    e.target.value === "true" && !answersIdArr.includes(e.target.id) &&
      setAnswersIdArr(prevArr => {
        let arr = [...prevArr]
        arr.push(e.target.id)
        return arr
      })
    setCountAnswers(answersIdArr.length)
  }


  const quizElements = quiz.map((item, index) => (
    <QuizElement
      id={index}
      key={index}
      question={item.question}
      correctAnswer={item.correctAnswer}
      incorrectAnswer={item.incorrectAnswer}
      isCheckAnswers={isCheckAnswers}
      scoreCount={scoreCount}
    />
  ))


  return (
    <>
      {!isStart && <FirstScreen startQuiz={startQuiz} selectCategory={selectCategory} />}
      {isStart && quizElements}
      {isStart && !isNewGame && <button className="btn quiz-btn" onClick={() => checkAnswers()} >Check answer</button>}
      {isNewGame &&
        <div className='score-el'>
          <p className="score-text">You scored {countAnswers}/5 correct answers</p>
          <button className="btn new-btn" onClick={() => { startQuiz(); checkAnswers() }} >
            Play again
          </button>
        </div>
      }
    </>
  )
}

export default App
