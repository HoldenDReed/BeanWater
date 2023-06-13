import "./NavBar.css"
import { logout } from "../helpers/logout";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

function showNav(){
    document.getElementsByClassName("navigation")[0].classList.toggle("active");
}

export const NavBar = () => {
    let navigate = useNavigate();
    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);
    const onLogout = () => {
        logout.logout(navigate);
      };
    return(
    <>
    <div className="navigation">
        <div className="ham-btn" onClick={showNav}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="links">
            <div className="link">
                <a href="/">Home</a>
            </div>
            <div className="link">
                <a href="/Drinks/type/1">Hot Coffees</a>
            </div>
            <div className="link">
                <a href="/Drinks/type/2">Hot Drinks</a>
            </div>
            <div className="link">
                <a href="/Drinks/type/3">Frappuccinos</a>
            </div>
            <div className="link">
                <a href="/Drinks/type/4">Cold coffees</a>
            </div>
            <div className="link">
                <a href="/Drinks/type/5">Teas</a>
            </div>
            <div className="link">
                <a href="/Drinks/Favorites">Favorites</a>
            </div>
            <div className="link">
                <a href="/tools">Tools</a>
            </div>
            <div className="link">
                <a href="#" onClick={onLogout}>Logout</a>
            </div>
        </div>
    </div>
    </>)
}