import { useState } from "react"
import { DrinksList } from "./DrinkList"
import "./DrinksContainer.css"
import { Link } from "react-router-dom"

export const DrinksContainer = () => {

    return <>
        <div className="drinksContainer">
            <h1>Welcome to BeanWater!</h1>
            <h4 className="mainDesc">Your home for making your favorite coffees, at home. We have several different categories to choose from with tool suggestions included. Feel free to click the links below to navigate to each drink category.</h4>
            <div className="typesContainer">
                <div className="type">
                    <Link to={`/Drinks/type/1`} className="link">
                        <h3>Hot Coffees</h3>
                    </Link>
                    <Link to={`/Drinks/type/1`} className="link">
                        <img className="typeImg" src="./coffee-cup.png"></img>
                    </Link>
                </div>
                <div className="type">
                    <Link to={`/Drinks/type/2`} className="link">
                        <h3>Hot Drinks</h3>
                    </Link>
                    <Link to={`/Drinks/type/2`} className="link">
                        <img className="typeImg" src="./hot-cup.png"></img>
                    </Link>
                </div>
                <div className="type">
                    <Link to={`/Drinks/type/3`} className="link">
                        <h3>Frappes</h3>
                    </Link>
                    <Link to={`/Drinks/type/3`} className="link">
                        <img className="typeImg" src="./frappe.png"></img>
                    </Link>
                </div>
                <div className="type">
                    <Link to={`/Drinks/type/4`} className="link">
                        <h3>Iced Coffees</h3>
                    </Link>
                    <Link to={`/Drinks/type/4`} className="link">
                        <img className="typeImg" src="./iced-coffee.png"></img>
                    </Link>
                </div>
                <div className="type">
                    <Link to={`/Drinks/type/5`} className="link">
                        <h3>Teas</h3>
                    </Link>
                    <Link to={`/Drinks/type/5`} className="link">
                        <img className="typeImg" src="./tea-cup.png"></img>
                    </Link>
                </div>
                <div className="type">
                    <Link to={`/Drinks/tools`} className="link">
                        <h3>Tools</h3>
                    </Link>
                    <Link to={`/Drinks/tools`} className="link">
                        <img className="typeImg" src="./coffee-machine.png"></img>
                    </Link>
                </div>
            </div>
        </div>
    </>
}
