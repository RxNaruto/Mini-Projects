import { useState } from "react";


export const Square=()=>{
    const[value,setValue] = useState<string | null>(null);
    const handleClick=()=>{
        setValue("X");
    }
    return  <button onClick={handleClick} className="text-center text-5xl font-bold border-4 border-black w-24 h-24 flex items-center justify-center">{value}</button>
}