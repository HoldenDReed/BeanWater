import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export const DrinksDetails = () => {
  const localUser = localStorage.getItem("capstone_user");
  const userObject = JSON.parse(localUser);

  const [drink, setDrink] = useState({})
  const [tools, setTools] = useState([])
  const { drinkId } = useParams()
  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(`https://localhost:7158/api/Drinks/id/${drinkId}`);
        const singleDrink = await response.json();
        setDrink(singleDrink);
        const recipeText = drink.recipe
        document.getElementById("recipeText").innerHTML = recipeText;
        
      };
      fetchData();
        
    },
    [drink]
  );
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://localhost:7158/api/Tools/id/${drinkId}`);
      const toolsArray = await response.json();
      setTools(toolsArray);
    };
    fetchData();
  }, [drink]
  );
  

  return (
    <>
      <div className="mainContainerDetails">
        <div className="recipeContainerDetails">
          <h2>{drink.name}</h2>
          <p id="recipeText"></p>
          <ul>
            {tools.map((tool) => (
              <li><a href={tool.Link} target="_blank">
                {tool.name}
              </a>
              </li>
            ))}
          </ul>
        </div>
        <img src={drink.drinksImg} className="drinkImgDetails"></img>
      </div>
    </>
  )
}