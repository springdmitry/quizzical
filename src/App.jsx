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
  const [category, setCategory] = useState("https://opentdb.com/api.php?amount=5")


  useEffect(() => {
    let quizArr = []
    isStart && fetch(category)
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
        setCategory("https://opentdb.com/api.php?amount=5")
      })
    return setQuiz([])
  }, [isStart])

  useEffect(() => {
    setAnswersIdArr([])
  }, [category])

  function selectCategory(e) {
    let selectedCategory = e.target.value.length > 0 ? `https://opentdb.com/api.php?amount=5&category=${e.target.value}` : 'https://opentdb.com/api.php?amount=5'
    setCategory(selectedCategory)
  }


  function startQuiz() {
    setIsStart(prevState => !prevState)
    setAnswersIdArr([])
  }

  function checkAnswers() {
    setIsCheckAnswers(prevState => !prevState)
    showNewGameBtn()
  }

  function showNewGameBtn() {
    setIsNewGame(prevState => !prevState)
  }

  useEffect(() => {
    setCountAnswers(answersIdArr.length)
  },[answersIdArr])
    
  function scoreCount(e) {
    // add to answersIdArr only correct answers that not in array
    if (e.target.value === "true" && !answersIdArr.includes(e.target.name)) {
      setAnswersIdArr(prevArr => {
        let arr = [...prevArr]
        arr.push(e.target.name)
        return arr
      })
    }
    // remove right answer if user clik wrong answer after correct
    if (e.target.value === "false" && answersIdArr.includes(e.target.name)) {
      setAnswersIdArr(prevArr => {
        let arr = [...prevArr]
        arr.pop()
        return arr
      })
    }
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
      {isStart && quizElements.length >  0 && quizElements}
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
