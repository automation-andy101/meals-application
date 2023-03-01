import { useState } from "react";
import { useGlobalContext } from "../context";


const Search = () => {

    const { setSearchTerm, fetchRandomMeal } = useGlobalContext();
    const [ text, setText ] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text) {
            setSearchTerm(text);
        }
    }

    const handleRandomMeal = () => {
        setSearchTerm('');
        setText('');
        fetchRandomMeal();
    }

    return (
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={text} placeholder="type favourite meal" className="form-input" />
                <button type="submit" className="btn">Search</button>
                <button type="button" className="btn btn-hipster" onClick={handleRandomMeal}>Surprise Me!</button>
            </form>
        </header>
    )
}

export default Search;