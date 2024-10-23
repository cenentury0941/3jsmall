import React, { useEffect, useState } from "react";
import "./styles.css"

function SpeedrunTitle({animate}) {
    
    const [ animationState , setAnimationState ] = useState(0)

    useEffect( () => {
        setTimeout( () => {
            setAnimationState(1)
        } , 10500 )
    } , [] )

    var speedrun = [ "S" , "P" , "E" , "E" , "D" , "R" , "U" , "N" ]
    
    return <div className="SpeedrunTitleContainer">
        <p style={{ margin : 0 , fontSize : "4vh", color : ( (animationState == 1) ? "orange" : "#393939" ), fontWeight:"900" }}>BLACK FRIDAY</p>
        <div className="SpeedrunTitleText">
            {
                speedrun.map( (val , ind) => {
                    return <p style={{ margin : 0 , color : ( (animationState == 1) ? "white" : "black" ) , animationDelay : ( "" + (ind*0.1) + "s" ) }} className="SpeedrunAnimation">{val}</p>
                } )
            }
        </div>
        <p style={{ margin : 0 , fontSize : "4vh", color : ( (animationState == 1) ? "green" : "#393939" ), fontWeight:"900" }}>CHALLENGE</p>
    </div>
}

export default SpeedrunTitle