'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './header.module.css';
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";



const Header = () => {

  const [token, setToken] = useState<string | null>(null);

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
      <div>
        {token ? (
          <div className={styles.perfil} >
                <Link href={'/perfil-acess'} className={styles.underlineColor} >
                    <FaRegUserCircle size={30} />
                </Link>
                <MdLogout size={30} 
                  className={styles.underlineColor}
                  onClick={() => LogOut()} style={{cursor: 'pointer'}}
              />
              

          </div>
        ) : (
          <Link href="/login-account">
            <button className={styles.btnSign}>Logar</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
