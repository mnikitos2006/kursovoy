import React, {createContext, useState} from "react";
import Square, {getColorTask, getTasks} from "./Provider/data";
import {Header} from "./Header/Header";
import {Body} from "./Body/Body";
import styles from "./App.module.css"
import {ModalWindow} from "./ModalWindow/ModalWindow";



function App() {

    return<div className={styles.app}>
            <Header/>
            <Body/>
        </div>


}

export default App;
