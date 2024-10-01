"use client"
import { useState } from 'react'
import styles from './burgermobile.module.scss'
import LightDark from '../LightDark/LightDark'

export default function BurgerMenuMobile() {
    const [showBurger, setShowBurger] = useState(false)
    const [showBtn, setShowBtn] = useState(true)

    const openBurger = () => {
        setShowBurger(true)
        setShowBtn(false)
    }

    const closeBurger = () => {
        setShowBurger(false)
        setShowBtn(true)
    }

    return (
        <>
           {showBtn&&  <button onClick={openBurger} className={styles.buttonBurger}><div className={styles.burgerimg}></div></button>}
            {showBurger && (
                <div className={styles.overlay}>
                    <div className={styles.burgerMenu}>
                        {/* <LightDark/> */}
                        <div onClick={closeBurger} className={styles.logoutImg}></div>
                    </div>
                </div>
            )}
        </>
    )
}
