import styles from "./Header.module.css"
import {ReactComponent as Plus} from "../img/pluse.svg";
import {useContext, useState} from "react";
import {ModalWindow} from "../ModalWindow/ModalWindow";

import {TaskManagerContext} from "../Provider";
import {TaskContainer} from "./components/TaskContainer/TaskContainer";
import {AddTask} from "./components/AddTask/AddTask";
import {Button} from "antd";

export const Header = () => {
    const {isVisibleAddTask,setIsVisibleAddTask, fetchLogout}=useContext(TaskManagerContext)
    return <div className={styles.container}>
        <Button onClick={fetchLogout}> Выход</Button>
        <h1>Tasks Manager by NIKITA</h1>
        <Plus onClick={() => setIsVisibleAddTask(true)}/>

        {isVisibleAddTask && <ModalWindow setIsVisible={setIsVisibleAddTask}>
            <AddTask/>
        </ModalWindow>}
    </div>
}