import { useState, useEffect } from "react";
import "./DrinksList.css";

export const ToolsList = () => {
  const [tools, setTools] = useState([]);
  const localUser = localStorage.getItem("capstone_user");
  const userObject = JSON.parse(localUser);

  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(`https://localhost:7158/api/Tools`);
        const toolsArray = await response.json();
        setTools(toolsArray);
        console.log(toolsArray)
      };
      fetchData();
    },
    []
  );
  const handleClick = (link) => {
    window.open(link, '_blank');
  };
  return (

    
      <div className="toolsContainer">
      <h3>Recommended Tools - Click on tools to be redirected</h3>
            {tools.map((tool) => (
                <div className="toolsList">
              <a className="toolsList" onClick={(e) => handleClick(tool.link)}>
                {tool.name}         
              </a>
              </div>
            ))}
      </div>
    

  )
};
