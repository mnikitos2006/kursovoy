import styles from "./HighlightedText.module.css"
export const HighlightedText=(props)=>{
    const {text,search, className} = props


    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return <span className={className}>{parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
            <span className={styles.highlight} key={index}>{part}</span>
        ) : (
            part
        )
    )
    }
</span>
}
