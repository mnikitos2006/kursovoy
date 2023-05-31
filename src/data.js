import {useState} from "react";

export const getTasks = () => {
    return [
        {id: 1, text: "Task1",color:"red"},
        {id: 2, text: "Task2",color:"green"},
        {id: 3, text: "Task3",color: "yellow"}
    ]
}
export const getColorTask=()=>{
   return ["#FFC8DD","#CEEDC7","#FF9494","#FFD4B2","#FFF6BD","#D7E3FC"]
}
