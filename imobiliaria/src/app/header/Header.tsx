import Image from 'next/image'
import React from 'react'

import styles from './header.module.css'
import Link from 'next/link'

const Header = () => {
  return (
        <header className={styles.header } > 
            <div>
              <Link href={'/'}>
                <Image
                    src="/devHouse.webp"
                    alt="image"
                    width={100}
                    height={100}
                    className={styles.images}
                />
              </Link>
            </div>
            <div>
              <Link href={'/login-account'}>
                <button className={styles.btnSign} >
                  Logar
                </button>
              </Link>
            </div>

        </header>
   )
}

export default Header;