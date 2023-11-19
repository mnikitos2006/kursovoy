import React, {useContext, useEffect} from 'react'
import {Header} from './Header/Header'
import {Body} from './Body/Body'
import styles from './App.module.css'
import {TaskManagerContext} from './Provider'
import {Loader} from './Loader/Loader'
import {Autorization} from "./Autorization/Autorization";

function App() {
    const {isLoading, isAuth,setIsAuth} = useContext(TaskManagerContext)
    useEffect(()=>{
        if (localStorage.getItem("isAuth")==="true"){
            setIsAuth(true)
        }
    },[])
    return (

            isAuth ? <div className={styles.app}>
                <Header/>
                <Body/>
                {isLoading && <Loader/>}


            </div> : <Autorization/>


    )
}

export default App
