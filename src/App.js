import React, {useContext, useEffect, useState} from 'react'
import {Header} from './Header/Header'
import {Body} from './Body/Body'
import styles from './App.module.css'
import {TaskManagerContext} from './Provider'
import {Loader} from './Loader/Loader'
import {Autorization} from './Autorization/Autorization'
import {Registration} from "./Registration/Registration";
import {Button} from "antd";

function App() {
    const [screen, setScreen] = useState("auth")
    const {isLoading, isAuth, setIsAuth, user, setUser, fetchLogout} =
        useContext(TaskManagerContext)

    useEffect(() => {
        if (localStorage.getItem('isAuth') === 'true') {
            setIsAuth(true)
        }
    }, [])

    useEffect(() => {
        if (!user) {
            const user = localStorage.getItem('client')
            if (user) {
                setUser(JSON.parse(user))
            } else {
                fetchLogout()
            }
        }
    }, [])
    return isAuth ? (
        <div className={styles.app}>
            <Header/>
            <Body/>
            {isLoading && <Loader/>}
        </div>
    ) : (<>
            {screen === "auth" && <Autorization/>}
            {screen === "registration" && <Registration/>}
            <Button
                onClick={() => setScreen(screen === "auth" ? "registration" : "auth")}>{screen === "auth" ? "registration" : "auth"}</Button>
        </>
    )
}

export default App
