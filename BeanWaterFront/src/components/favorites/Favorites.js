import { useEffect, useState } from "react";
import { Drink } from "../drinks/Drink";
export const Favorites = () => {
  const localUser = localStorage.getItem("capstone_user");
  const userObject = JSON.parse(localUser);


  const [favorites, setFavorites] = useState([])

  useEffect(
    () => {
      const fetchFavorites = async () => {
        const response = await fetch(`https://localhost:7158/api/Favorites?uId=${userObject.uid}`)
        const responseJSON = await response.json()
        console.log(responseJSON)
        setFavorites(responseJSON)
      }
      fetchFavorites()
    },
    []
  )

  const isFavorite = (id) => {
   const found = ""
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
    <>
      <div>
        <h2 className="drinkTypeTitle">Favorites Page</h2>
        <div className="drinks">
          <div className="container">
            {
              favorites.map(drink => <Drink key={`drink--${drink.id}`}
                id={drink.drinkId}
                name={drink.drinks.name}
                img={drink.drinks.drinksImg} 
                isFavorite={isFavorite()}
                favoritesId={drink.id}/>)
            }
          </div>
        </div>
      </div>
    </>
  );
}