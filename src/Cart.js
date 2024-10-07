import React from "react";
import "./styles.css"

function Cart({gameState,isSpeedRun,targetCart,currentCart}){
    return (
        <div className="Cart">
            <div style={{paddingBottom:"1vh"}}>
                { gameState.includes("SPEEDRUN") ? ( gameState.includes("RETURN") ? "Get To Checkout" : "Items to add to cart" ) : "Your Cart" }
            </div>
            {targetCart.map(  value => {return <div style={{ fontSize: "2vh" , color : ( currentCart.includes(value) ) ? "#b6ff6d" : "#ff6d6d" }}>{value}</div>} )}
        </div>
    )
}

export default Cart