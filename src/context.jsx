import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';


const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'


const AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favourites, setFavourites] = useState([]);

    // const fetchMeals = async () => {
    //     try {
    //         const response = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=a')
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchMeals();
    // }, []);

    const fetchMeals = async (url) => {
        setLoading(true);
        try {
            const {data} = await axios(url)
            
            if (data.meals) {
                setMeals(data.meals);
            } else {
                setMeals([]);
            }
            
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false);
    }

    const fetchRandomMeal = async () => {
        fetchMeals(randomMealUrl);
    }

    const selectMeal = (idMeal, favouriteMeal) => {
        let meal;
        meal = meals.find((meal) => meal.idMeal === idMeal);

        setSelectedMeal(meal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavourites = (idMeal) => {
        const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal);
        if (alreadyFavourite) return;
        
        const meal = meals.find((meal) => meal.idMeal === idMeal);
        const updateFavourites = [...favourites, meal];
        localStorage.setItem('favourites', JSON.stringify(updateFavourites));

        setFavourites(updateFavourites);
    }

    const removeFromFavourites = (idMeal) => {
        const updateFavourites = favourites.filter((meal) => meal.idMeal !== idMeal);
        localStorage.setItem('favourites', JSON.stringify(updateFavourites));

        setFavourites(updateFavourites);
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, []);

    useEffect(() => {
        if (!searchTerm) return
        
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm]);

    return <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal, 
        showModal, selectedMeal, selectMeal, closeModal, favourites, addToFavourites, removeFromFavourites }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };
