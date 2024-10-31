'use client'

import Slider from "./slider/Slider";
import CategoryList from "./Category/CategoryList";
import { IoSend } from "react-icons/io5";
import home from './home.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {



  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const Post = () => {
    router.push('/post-acess');
  }



  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);



  return (
    <main>
      <Slider/>
      <h2 className={home.title} > Veja imóveis disponiveis </h2>
      <CategoryList/>
      
      {token && (
        <div className={home.dcs} >
            <IoSend size={40} onClick={() => Post()}/>
        </div>
      )}
    </main>
  );
}