import React from 'react'
import { Header } from './Header/Header'
import { Body } from './Body/Body'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Body />
    </div>
  )
}

export default App
