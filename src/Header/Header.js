import styles from "./Header.module.css"
import {ReactComponent as Plus} from "../img/pluse.svg";
import {useContext, useState} from "react";
import {ModalWindow} from "../ModalWindow/ModalWindow";

import {TaskManagerContext} from "../Provider";
import {TaskContainer} from "./components/TaskContainer/TaskContainer";
import {AddTask} from "./components/AddTask/AddTask";

export const Header = () => {
const [isVisible,setIsVisible]=useState(false)
    return <div className={styles.container}>
        <div>tasks Manager</div>
        <Plus onClick={() => setIsVisible(true)}/>

        {isVisible && <ModalWindow setIsVisible={setIsVisible}>
            <AddTask/>
        </ModalWindow>}
    </div>
}