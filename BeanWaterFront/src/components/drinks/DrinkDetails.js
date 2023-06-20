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
  const handleClick = (link) => {
    window.open(link, '_blank');
  };
  
  return (
    <>
      <div className="mainContainerDetails">
        <div className="recipeContainerDetails">
          <h2>{drink.name}</h2>
          <p id="recipeText"></p>
          <h3>Recommended Tools - Click on tools to be redirected</h3>
          <ul>
            {tools.map((tool) => (
              <li><a onClick={(e) => handleClick(tool.link)}>
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