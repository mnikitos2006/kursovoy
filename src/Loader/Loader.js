import { Spin } from 'antd'
import style from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={style.container}>
      <Spin tip="Loading" size="large" />
    </div>
  )
}
