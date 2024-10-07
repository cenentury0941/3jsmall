import React from "react";
import "./styles.css"

function Timer({curTime, remTime}){
    function formatMilliseconds(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10); // Get two-digit milliseconds
    
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');
        const millisecondsStr = milliseconds.toString().padStart(2, '0');
    
        return `${minutesStr}:${secondsStr}.${millisecondsStr}`;
    }

    
    return (
        <div className="Timer">
            <div>
            <div>Current Time</div>
            <div style={{fontSize:"3vh", fontWeight:"700"}}>{formatMilliseconds(curTime)}</div>
            </div>
            <div>
            <div style={{color:"#ff6d6d"}}>Remaining Time</div>
            <div style={{color:"#ff6d6d", fontWeight:"700", fontSize:"3vh"}}>{formatMilliseconds(168000-curTime)}</div>
            </div>
        </div>
    )
}

export default Timer