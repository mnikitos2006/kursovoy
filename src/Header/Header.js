import styles from "./Header.module.css"
import {ReactComponent as Plus} from "../img/pluse.svg";
import {useState} from "react";
import {getColorTask} from "../data";
import {ModalWindow} from "../ModalWindow/ModalWindow";
import {AddTask} from "./components/AddTask/AddTask";

export const Header = (props) => {
    const [text, setText] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [color,setColor]=useState("orange")
    // const [isClicked, setIsClicked] = useState(false);
    console.log("HeaderIsVisible",isVisible)


    const addTask = () => {
        props.setTask(prevstate => {
            console.log("prevstate", prevstate)
            const newArr = [...prevstate]
            newArr.push({id: newArr.length + 1, text: text,color:color})
            return newArr
        })
        setIsVisible(false)
        setText("")
    }

    return <div className={styles.container}>
        <div>tasks Manager</div>
        <Plus onClick={() => setIsVisible(true)}/>

        {isVisible && <ModalWindow setIsVisible={setIsVisible}>
            <AddTask{...{text,setText,setColor,addTask}}/>
        </ModalWindow>}
    </div>
}