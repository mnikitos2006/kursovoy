import styles from "./Header.module.css"
import {ReactComponent as Plus} from "../img/pluse.svg";
import {useContext, useState} from "react";
import {ModalWindow} from "../ModalWindow/ModalWindow";

import {TaskManagerContext} from "../Provider";
import {TaskContainer} from "./components/TaskContainer/TaskContainer";
import {AddTask} from "./components/AddTask/AddTask";

export const Header = () => {
    const {isVisibleAddTask,setIsVisibleAddTask}=useContext(TaskManagerContext)
    return <div className={styles.container}>
        <div>tasks Manager</div>
        <Plus onClick={() => setIsVisibleAddTask(true)}/>

        {isVisibleAddTask && <ModalWindow setIsVisible={setIsVisibleAddTask}>
            <AddTask/>
        </ModalWindow>}
    </div>
}