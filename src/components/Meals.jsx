import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/Cart-store";

export const Meals = () => {

  const [mealsData, setMealsData] = useState([]);

  const { cartItems, addCartItem } = useContext(CartContext);

  useEffect(() => {
    async function fetchMealsData() {
      const data = await fetch('http://localhost:3000/meals');
      const data1 = await data.json();
      setMealsData(data1);
    }
    fetchMealsData();
  }, [])
  

  return (
    <div id="meals">
      {
        mealsData.map((meal) => {
          return (
            <div className="meal-item" key={meal.id}>
              <article>
                <img
                  src={"http://localhost:3000/" + meal.image}
                  alt={meal.name + " image"}
                />
                <h3>{meal.name}</h3>
                <p className="meal-item-price">
                  {'$' + meal.price}
                </p>
                <span className="meal-item-description">
                  {meal.description}
                </span>
                <div className="meal-item-actions">
                  <button className="button" onClick={() => addCartItem(meal)}>Add to Cart</button>
                </div>
              </article>
            </div>
          );
        })
      }
    </div>
  )
}