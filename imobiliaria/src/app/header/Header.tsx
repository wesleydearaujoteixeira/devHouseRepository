'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './header.module.css';
import { useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";




const Header = () => {

  const [token, setToken] = useState<string | null> (null);
  const [sideMenu, setSideMenu] = useState <string> ('100%');
  const [state, setNewState] = useState <boolean> (true);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const LogOut = () => {

    alert('Deslogado');

    localStorage.removeItem('token');
    setToken(null);
    router.push("/login-account");
    
    setTimeout(() => {
      location.reload();
    }, 1000)



  };


  const ChangeTheSideMenu = () => {
    setNewState(true);
    if (state) {
      setSideMenu( '60%');
    } 

  }

  const SideChange = () => {
    setNewState(false);
    if (!state) {
      setSideMenu('100%');
    }
  }

  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <Image
            src="/devHouse.webp"
            alt="image"
            width={100}
            height={100}
            className={styles.images}
            priority 
          />
        </Link>
      </div>

      <div style={{cursor: 'pointer'}} onClick={() => ChangeTheSideMenu()}>
        <IoMenu size={30}  className={styles.iconMenu} />
      </div>

      
      <div className={styles.menu} style={{
        position: 'fixed',
        left: sideMenu,
        transition: 'width 0.5s ease-in-out',
        top: 0,
        right: -1,
        bottom: 0
        
      }}>
         
         
         
        <div className={styles.container} >
          <div> </div>
          <div className={styles.myOptions} >
            {token ? (
              <div className={styles.perfil} >
                                          
                    <Link href={'/perfil-acess'} className={styles.underlineColor} >
                        <span className={styles.underlineColor}> minhas casas </span>
                    </Link>                    

                    <Link href={'/minhasReservas'} className={styles.underlineColor}> minhas reservas </Link>
                     
                     <div>
                       <span className={styles.underlineColor} onClick={() => LogOut()} style={{cursor: 'pointer'}}> Sair </span>
                     </div>
              </div>
            ) : (
              <Link href="/login-account">
                <button className={styles.btnSign}>Logar</button>
              </Link>
            )}
          </div>
          
          <span className={styles.closeSideBar}   >
            <IoCloseSharp size={50} onClick={() => SideChange()}/>
          </span>

        </div>
      </div>
     
    </header>
  );
};

export default Header;
