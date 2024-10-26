'use client';

import Image from "next/image"
import { MdLocationOn } from "react-icons/md";
import style from './category.module.css';

import { getHouses } from "../services/servicesApi";
import { useEffect, useState } from "react";
import { HouseTypes } from "../types/TypesObject";


const CategoryList = () => {


    const [houses, setHouses] = useState <HouseTypes[]> ([]);


    useEffect(() => {
        getHouses().then((response) => {
            console.log(response.data.houses);
            setHouses(response.data.houses);
        });

  
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
                    />
                        <p> {casa.description} </p>
                    </section>
                        
                <div className={style.content}>
                    <MdLocationOn size={30} className={style.location}  />
                    <p> {casa.location} </p>
                </div>
                <div className={style.cartReserve} >
                    <h2> R$ {casa.price} </h2>
                    <span className={style.btnReserve} > Reservar </span>
                </div>
                </div>
                )
            }) }           
    </main>
  )
}

export default CategoryList