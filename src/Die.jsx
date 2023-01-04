import { useState } from "react"

export default function Die(props){
    
    return (
        <div 
            className={props.isHeld ? "selected": ""}
            onClick={() => props.holdDice(props.id)}
        >
            {props.value}
            </div>
    )
}