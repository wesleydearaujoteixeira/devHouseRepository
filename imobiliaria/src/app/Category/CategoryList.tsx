'use client';

import Image from "next/image"
import { MdLocationOn } from "react-icons/md";
import style from './category.module.css';

import { getHouses } from "../services/servicesApi";
import { useEffect, useState } from "react";
import { HouseTypes } from "../types/TypesObject";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RemoveSomethingOntheString } from "../utils/RemoveString";


const CategoryList = () => {

    const [houses, setHouses] = useState <HouseTypes[]> ([]);
    const [token, setToken] = useState <string | null> (null);

    const user_id = localStorage.getItem('user_id');
    const tokenId = localStorage.getItem('token') || '';
    const router = useRouter();

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



    const FetchReservers = async (id: string) => {

        if (user_id && tokenId) {
           
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_URL_POST}/${id}/${RemoveSomethingOntheString(user_id)}`, 
                    {}, 
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${JSON.parse(tokenId)}`
                        }
                    }
                );

                    console.log(response.data);

                    alert("casa reservada");

                    setTimeout(() => {
                        router.push('/minhasReservas');
                    }, 1000);

            
            } catch (err) {
                console.error("Erro na requisição:", err);
            }
        }else {
            alert("Falha no user_id e token");
            return;
        }
    }


  return (
    <main className={`${ houses.length > 0 ? style.gridContent : style.flexContent }`} > 
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
                            
                        <span className={style.btnReserve} onClick={() => FetchReservers(casa._id)}> Reservar </span>
                    
                    )}

                    
                </div>
                </div>
                )
            })}

            {houses.length <= 0 && (
                <section className={style.spinner}>
                </section>
            )}
          
    </main>
  )
}

export default CategoryList