import { useState } from "react";
import { useGlobalContext } from "../context";


const Search = () => {

    const { loading, meals } = useGlobalContext();

    return (
        <header className="search-container">
            <form>
                <input type="text" placeholder="type favourite meal" className="form-input" />
                <button type="submit" className="btn">Search</button>
                <button type="button" className="btn btn-hipster">Surprise Me!</button>
            </form>
        </header>
    )
}

export default Search;