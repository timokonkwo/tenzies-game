import { useState } from "react"

export default function Die(props){
    
    return (
        <div 
            className={props.isHeld ? "selected": ""}
            onClick={() => props.select(props.id)}
        >
            {props.number}
            </div>
    )
}