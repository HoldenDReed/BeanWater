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
              setFavorites(responseJSON)
          }
          fetchFavorites()
      },
      []
  )
return (
  <>
            <div>
                <h2>Favorites Page</h2>
                <div className="drinks">
            <div className="container">
            {
              favorites.map(drink => <Drink key={`drink--${drink.id}`}
                  id={drink.id}
                  name={drink.name}
                  img={drink.drinksImg} /> )
            }
            </div>
          </div>
            </div>
            </>
);
}