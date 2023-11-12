import React, { useContext } from 'react'
import { Header } from './Header/Header'
import { Body } from './Body/Body'
import styles from './App.module.css'
import { TaskManagerContext } from './Provider'
import { Loader } from './Loader/Loader'

function App() {
  const { isLoading } = useContext(TaskManagerContext)
  return (
    <div className={styles.app}>
      <Header />
      <Body />
      {isLoading && <Loader />}
    </div>
  )
}

export default App
