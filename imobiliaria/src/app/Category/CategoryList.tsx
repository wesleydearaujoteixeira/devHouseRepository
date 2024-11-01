'use client';

import Image from "next/image"
import { MdLocationOn } from "react-icons/md";
import style from './category.module.css';

import { getHouses } from "../services/servicesApi";
import { useEffect, useState } from "react";
import { HouseTypes } from "../types/TypesObject";
import Link from "next/link";


const CategoryList = () => {


    const [houses, setHouses] = useState <HouseTypes[]> ([]);


    const [token, setToken] = useState<string | null>(null);

    const loadToken = () => {
        const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }

    useEffect(() => {
        
        getHouses().then((response) => {
            setHouses(response.data.houses);
        });

        loadToken();

    }, []);


  return (
    <main className={style.gridContent} > 
        {houses.length > 0 && houses.map((casa, index) => {
            return (
            <div className={style.cart} key={index}>
                <section className={style.info}  >
                    <Image
                            src={casa?.images_url}
                            alt={'sac'}
                            width={300}
                            height={300}
                            priority 
                    />
                        <p> {casa.description} </p>
                    </section>
                        
                <div className={style.content}>
                    <MdLocationOn size={30} className={style.location}  />
                    <p> {casa.location} </p>
                </div>
                <div className={style.cartReserve} >
                    <h2> R$ {casa.price} </h2>
                    
                    {token && (
                        <Link href={`reserve-account/${casa._id}`}> 
                            <span className={style.btnReserve} > Reservar </span>
                        </Link>
                    )}

                    
                </div>
                </div>
                )
            }) }           
    </main>
  )
}

export default CategoryList