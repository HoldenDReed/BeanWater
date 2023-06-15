import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai"
import { AiOutlineStar } from "react-icons/ai"

    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);

export const Drink = ({ id, name, img, isFavorite, favoritesId}) => {

    return <section className="drink">
        <h1>{id}</h1>
        <h1>{favoritesId}</h1>
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
                                             fetch(`https://localhost:7158/api/Favorites/${favoritesId}`, {
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