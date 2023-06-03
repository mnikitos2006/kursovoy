import styles from "./Header.module.css"
import {ReactComponent as Plus} from "../img/pluse.svg";
import {useContext, useState} from "react";
import {getColorTask} from "../data";
import {ModalWindow} from "../ModalWindow/ModalWindow";
import {AddTask} from "./components/AddTask/AddTask";
import {TaskManagerContext} from "../App";

export const Header = () => {
const {isVisible,setIsVisible}=useContext(TaskManagerContext)
    return <div className={styles.container}>
        <div>tasks Manager</div>
        <Plus onClick={() => setIsVisible(true)}/>

        {isVisible && <ModalWindow setIsVisible={setIsVisible}>
            <AddTask/>
        </ModalWindow>}
    </div>
}