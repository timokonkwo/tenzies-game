import { useState } from "react"

export default function Die(prop){
    const [selected, setSelected] = useState(false);

    return (
        <div 
            className={selected ? "selected": ""}
            onClick={() => setSelected(!selected)}
        >
            {prop.number}
            </div>
    )
}