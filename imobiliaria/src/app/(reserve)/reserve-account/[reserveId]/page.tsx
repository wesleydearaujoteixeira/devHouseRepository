'use client'

import { useParams, useRouter  } from "next/navigation"
import reserve from './reserve.module.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { RemoveSomethingOntheString } from "@/app/utils/RemoveString";
import { FaRegCheckCircle } from "react-icons/fa";


const ReserveHouse = () => {

    const {reserveId} = useParams();
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token') || '';
    const router = useRouter();
    const [state, setState] = useState <boolean> (true);


    const FetchReservers = async () => {

        if (user_id && token) {
           
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_URL_POST}/${reserveId}/${RemoveSomethingOntheString(user_id)}`, 
                    {}, // corpo vazio
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token && JSON.parse(token)}`
                        }
                    }
                );

                setTimeout(() => {
                    console.log(response.data);
                    setState(false);
                }, 1000);

                
                setTimeout(() => {
                    router.push('/minhasReservas');
                }, 2000);

            
            } catch (err) {
                console.error("Erro na requisição:", err);
            }
        }else {
            alert("Falha no user_id e token");
            return;
        }
    }


    useEffect(() => {
        FetchReservers();
    }, []);

  return (
    <div className={reserve.container} >
        <h2 className={reserve.title} > {state ? "carregando..." : " Casa Agendada com sucesso "} </h2>
        
            {state && <div className={reserve.spinner}></div>}
            {!state && <div> <FaRegCheckCircle size={200}/> </div>}

    </div>
  )
}

export default ReserveHouse