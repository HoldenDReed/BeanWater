import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai"
import { AiOutlineStar } from "react-icons/ai"

    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);

export const Drink = ({ id, name, img }) => {

    const navigate = useNavigate()
    const [isFavorite, setIsFavorite] = useState(false)
    const [favoritesId, setFavoritesId] = useState("")

    useEffect(
        () => {
            const checkIfFavorite = async () => {
                const response = await fetch(`https://localhost:7158/api/Favorites?uId=${userObject.uid}&drinkId=${id}`)
                const responseJSON = await response.json()
                const responseLength = await responseJSON.length
                    setFavoritesId(responseJSON[0])
                if (await responseLength === 0) {
                    setIsFavorite(false)
                } else {
                    setIsFavorite(true)
                }
            }
            checkIfFavorite()
        },
        [id]
    )

    return <section className="drink">
        <div className="drinkChild">
            <Link to={`/drinks/id/${id}`} className="link"><h3>{name}</h3></Link>
        </div>
        <div className="drinkChild">
            <Link to={`/drinks/id/${id}`}>
                <img src={img} className="drinkImg"></img>
            </Link>
        </div>
        <div className="drinkButton">
                        {
                            isFavorite
                                ? <button className="deleteButton"
                                    onClick={() => {
                                      if  (window.confirm("Are you sure?")) {
                                             fetch(`http://localhost:7158/Favorites/${favoritesId.id}`, {
                                                method: "DELETE" 
                                            })
                                            .then(window.location.reload(false))
                                        } else {
                                            
                                        }
                                    }}
                                    ><AiFillStar/></button>
                                : <button className="deleteButton" onClick={async () => {
                                    await fetch(`https://localhost:7158/api/Favorites?uId=${userObject.uid}`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            uid: userObject.uid,
                                            drinkId: id
                                        })
                                    })
                                    window.location.reload(false)
                                }}
                             ><AiOutlineStar/></button>
                        }
        </div>
        
    </section>
}