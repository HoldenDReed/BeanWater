import { useState, useEffect } from "react";
import { Drink } from "./Drink";
import { useParams } from "react-router-dom";
import "./DrinksList.css";

export const DrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [drinkType, setDrinkType] = useState([]);
  const { typeId } = useParams()


  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(`https://localhost:7158/api/Drinks/type/${typeId}`);
        const drinksArray = await response.json();
        setDrinks(drinksArray);
      };
      fetchData();
    },
    [typeId]
  );

  useEffect(
    () => {
      const setType = async () => {
        setDrinkType(drinks[0].drinkType);
      };
      setType();
    },
    [drinks]
  );


  return (

    <div className="drinksListContainer">
      <h2 className="drinkTypeTitle">{drinkType}</h2>
      <div className="container">
        {
          drinks.map(drink => <Drink key={`drink--${drink.id}`}
            id={drink.id}
            name={drink.name}
            img={drink.drinksImg} />)
        }
      </div>
    </div>

  )
};
