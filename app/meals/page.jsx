import React from 'react'
import MealSearch from './components/MealSearch';

export default async function Meals({ searchParams }) {

    const query = await searchParams;
    console.log(query)

    const fetchMeals = async () => {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query.search}`);
            const data = await res.json();
            return data.meals;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
    const meals = await fetchMeals()
    console.log(meals)
    return (
        <div>
            <MealSearch></MealSearch>
            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5'>
                {meals?.map((meal) => (
                    <div key={meal.idMeal}>
                        <h2 className='text-lg font-semibold text-center'>{meal.strMeal}</h2>
                        <img className='w-60 h-50 rounded-md' src={meal.strMealThumb} alt={meal.strMeal} />
                    </div>
                ))}
            </div>
        </div>
    )

}




// this a search option add a find a meal items here by using search n