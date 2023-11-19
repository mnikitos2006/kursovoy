import { Select } from 'antd'
import styles from './selects.module.css'

export const CustomSelect = (props) => {
  const { options, defaultValue, onChange } = props
  return (

      <Select className={styles.selects}
        onChange={onChange}
        defaultValue={defaultValue}
        options={options}
      />

  )
}
