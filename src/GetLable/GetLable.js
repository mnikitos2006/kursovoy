import styles from "./GetLable.module.css"
export const GetLable=(props)=>{
    const {children,title}=props
    return<div className={styles.getLable}>
    <div className={styles.title}>
        {title}
    </div>
        <div className={styles.children}>
            {children}
        </div>
    </div>
}