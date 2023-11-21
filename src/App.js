import React, { useContext, useEffect } from 'react'
import { Header } from './Header/Header'
import { Body } from './Body/Body'
import styles from './App.module.css'
import { TaskManagerContext } from './Provider'
import { Loader } from './Loader/Loader'
import { Autorization } from './Autorization/Autorization'

function App() {
  const { isLoading, isAuth, setIsAuth, user, users, setUser, fetchLogout } =
    useContext(TaskManagerContext)
  useEffect(() => {
    if (localStorage.getItem('isAuth') === 'true') {
      setIsAuth(true)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      const userId = localStorage.getItem('clientId')
      console.log(userId)
      if (userId) {
        const user = users.find((el) => {
          return el.id === userId
        })
        setUser(user)
      } else {
        fetchLogout()
      }
    }
  }, [])
  return isAuth ? (
    <div className={styles.app}>
      <Header />
      <Body />
      {isLoading && <Loader />}
    </div>
  ) : (
    <Autorization />
  )
}

export default App
