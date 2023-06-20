import { useNavigate } from "react-router-dom";
import { DrinksContainer } from "../drinks/DrinksContainer";
import { DrinksDetails } from "../drinks/DrinkDetails";
import { Favorites } from "../favorites/Favorites";
import { logout } from "../helpers/logout";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { NavBar } from "../navBar/NavBar";
import { ToolsList } from "../drinks/Tools";
import { EditName } from "../drinks/EditName";
import { useEffect, useState } from "react";
import "./views.css"
import { DrinksList } from "../drinks/DrinkList";
export const ApplicationViews = () => {
  let navigate = useNavigate();
  const localUser = localStorage.getItem("capstone_user");
  const userObject = JSON.parse(localUser);

  // Move this to where ever you end up putting your logout button
  const onLogout = () => {
    logout.logout(navigate);
  };
  const [user, update] = useState({
    displayName: "",
});
  useEffect(
    () => {
        const fetchUser = async () => {
            const response = await fetch(`https://localhost:7158/api/Users/uid/${userObject.uid}`)
            const users = await response.json()
            update(users)
        }
        fetchUser()
    },
    []
)
  return (
    <Routes>
    <Route
        element={

            <>
            <NavBar />
            <header className="header"> 
                <h2 className="headerText">Welcome, <br></br>{user.displayName}</h2>
                <div className="titleLogo">
                <img className="inline" src="https://cdn.shopify.com/s/files/1/0612/7396/4596/files/Bean_Water_Logo_White_x140.png?v=1667485346"></img>
                </div>
                </header>
                
                <Outlet />

            </>

        }>
            
        <Route path="/" element={<DrinksContainer />} />
        <Route path="/Drinks/type/:typeId" element={<DrinksList />} />
        <Route path="/Drinks" element={<DrinksList />} />
        <Route path="/Drinks/id/:drinkId" element={<DrinksDetails />} /> 
        <Route path="/Drinks/favorites" element={<Favorites />} />
        <Route path="/Drinks/tools" element={<ToolsList />} />
        <Route path="/edit" element={<EditName />} />
        
    </Route>
</Routes>
  );
};
