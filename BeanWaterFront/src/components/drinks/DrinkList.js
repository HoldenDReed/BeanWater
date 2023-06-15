import { useState, useEffect } from "react";
import { Drink } from "./Drink";
import { useParams } from "react-router-dom";
import "./DrinksList.css";

export const DrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [drinkType, setDrinkType] = useState("");
  const { typeId } = useParams()
  const [favorites, setFavorites] = useState([])
  const localUser = localStorage.getItem("capstone_user");
  const userObject = JSON.parse(localUser);

  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(`https://localhost:7158/api/Drinks/type/${typeId}`);
        const drinksArray = await response.json();
        setDrinks(drinksArray);
        console.log(drinksArray)
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

  useEffect(
    () => {
      const checkIfFavorite = async () => {
        const response = await fetch(`https://localhost:7158/api/Favorites?uId=${userObject.uid}`)
        const responseJSON = await response.json()
        setFavorites(responseJSON)
      }
      checkIfFavorite()
    },
    [drinks]
  )
  const isFavorite = (id) => {
    console.log(id)
    const found = favorites.find(obj => {
      return obj.drinkId === id
    });
    return found !== undefined
  }

  const favoriteId = (id) => {
    const found = favorites.find(obj => obj.drinkId === id);
    if (found) {
      return found.id
    } else {

    }
  }


  return (

    <div className="drinksListContainer">
      <h2 className="drinkTypeTitle">{drinkType}</h2>
      <div className="container">
        {
          drinks.map(drink => <Drink key={`drink--${drink.id}`}
            id={drink.id}
            name={drink.name}
            img={drink.drinksImg}
            isFavorite={isFavorite(drink.id)}
            favoritesId={favoriteId(drink.id)}
          />)
        }
      </div>
    </div>

  )
};
