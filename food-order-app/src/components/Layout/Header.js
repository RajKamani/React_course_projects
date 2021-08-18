import classes from "./Header.module.css";
import MealImg from "../../assets/meals.jpg";
import React from "react";
import HeaderCartButton from "./HeaderCartButton"

const Header = (props) => {

    return (

        <React.Fragment>
            <header className={classes.header} >
                <h1>Meal Order</h1>
                <HeaderCartButton onCartClick={props.onCartClick} />
            </header>
            <div className={classes['main-image']}>
                <img src={MealImg} alt="Meal" />
            </div>

        </React.Fragment>
    );

}

export default Header;