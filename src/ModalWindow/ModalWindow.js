import styles from "./ModalWindow.module.css"
import {ReactComponent as Plus} from "./img/pluse.svg";
import {useState} from "react";
export const ModalWindow = (props) => {
    const closeWindow=()=>{
        props.setIsVisible(false)
    }


    return <div className={styles.modalWindow}>
        <div className={styles.container}>
            <div className={styles.header}>  <Plus onClick={closeWindow}/></div>
            <div>
                {props.children}
            </div>
        </div>
    </div>
}