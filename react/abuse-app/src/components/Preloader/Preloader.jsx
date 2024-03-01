import styles from "./Preloader.module.scss";

function Preloader(){
    return (
        <div className={styles.wrap}>
            <div className={styles.loaderWrap}>
                <span className={styles.loader}></span>
            </div>
        </div>
    )
}

export default Preloader;