import { useState, useEffect } from "react";
import { Drink } from "./Drink";
import { useParams } from "react-router-dom";

import "./DrinksList.css";

export const DrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const {typeId} = useParams

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://localhost:7158/api/Drinks/type/${typeId}`);
      const drinksArray = await response.json();
      setDrinks(drinksArray);
      console.log("hello")
    };
    fetchData();
  }, [typeId]
  );


  return (
   
      <div className="drinks">
      <h2 className="drinkTypeTitle">{typeId}</h2>
            <div className="container">
            {
              drinks.map(drink => <Drink key={`drink--${drink.id}`}
                  id={drink.id}
                  name={drink.name}
                  img={drink.drinksImg} /> )
            }
            </div>
          </div>
        
)
};
