import React, {createContext, useState} from "react";
import Square, {getColorTask, getTasks} from "./data";
import {Header} from "./Header/Header";
import {Body} from "./Body/Body";
import styles from "./App.module.css"
import {ModalWindow} from "./ModalWindow/ModalWindow";

export const TaskManagerContext = createContext({})

function App() {

    const [tasks, setTask] = useState(getTasks)
    const [text, setText] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [color,setColor]=useState(getColorTask()[0])
    // const [isClicked, setIsClicked] = useState(false);
    console.log("HeaderIsVisible",isVisible)


    const addTask = () => {
        setTask(prevstate => {
            console.log("prevstate", prevstate)
            const newArr = [...prevstate]
            newArr.push({id: newArr.length + 1, text: text,color:color})
            return newArr
        })
        setIsVisible(false)
        setText("")
        setColor((getColorTask()[0]))
    }

    const getProviderData=()=>{
        return {data: 25,tasks,setTask,color,text,addTask,isVisible,setColor,setIsVisible,setText}
    }
    return <TaskManagerContext.Provider value={getProviderData()}>
        <div className={styles.app}>
            <Header/>
            <Body/>
        </div>
    </TaskManagerContext.Provider>

}

export default App;
