import './FirstScreen.css'
import categoriesList from './categoriesList'


export default function FirstScreen({ startQuiz, selectCategory }) {
    const selectOptionsEl = categoriesList.map((category, index) => {
        return <option value={category.id} key={index}>{category.name}</option>
    })

    return (
        <div className="first-screen">
            <h1>Quizzical</h1>
            <p>Select category from list below</p>
            <select name="categories" onChange={(e)=>selectCategory(e)}>
                <option value="" defaultValue>All categories</option>
                {selectOptionsEl}
            </select>
            <button onClick={startQuiz} className="btn start-btn">Start quiz</button>
        </div>
    )
}