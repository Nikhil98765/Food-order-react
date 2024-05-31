
import { MealItem } from "./MealItem.jsx";
import { useHttp } from "../hooks/useHttp.js";
import { Error } from "./UI/Error.jsx";

const config = {}

export const Meals = () => {

  const {
    data: mealsData,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", config, []);

  if (isLoading) {
    return (<p className="center">Fetching the meals data...</p>);
  }

  if (error) {
    return (<Error title="Failed to fetch meals" message={error}></Error>);
  }
  
  return (
    <ul id="meals">
      {
        mealsData.map(meal => {
          return (
            <MealItem key={meal.id} meal={ meal } />
          )
        })
      }
    </ul>
  )
}