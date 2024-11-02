'use client';
import Image from 'next/image';
import stl from './reservas.module.css';
import { FaWhatsappSquare } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RemoveSomethingOntheString } from '@/app/utils/RemoveString';
import { Appointment } from '@/app/types/TypesObject';
import { useRouter } from 'next/navigation';



const MyReserves = () => {

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  const router = useRouter();

  const [reserves, setReserves] = useState <Appointment[]> ([]);


  const GetMyReservers = async () => {
    if(user_id && token) {

      try {
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_RESERVE}/${RemoveSomethingOntheString(user_id)}`,{
          headers: {
            Authorization: `Bearer ${token && JSON.parse(token) }`,
          },
        });
        console.log(response.data.houses);
        setReserves(response.data.houses);

      } catch (error) {
        console.error(error);
        
      }
      
    }
  }



  const DeleteOneReserve = async (id: string) => {
    if(user_id && token) {


      const confirmation = confirm(`Gostaria de deletar essa reserva?`);

      if(!confirmation) {
        return;
      }


      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_POST}/${id}/${RemoveSomethingOntheString(user_id)}`,{
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          }
        });
        console.log(response.data);

      } catch (error) {
          console.error(error);
      }
    }

    setTimeout(() => {
      router.push('/');
    }, 500);

  }

  useEffect(() => {
    GetMyReservers();
  }, [token, user_id]);


  return (
    <div className={stl.container}>
      <h2 className={stl.title} > minhas reservas </h2>
        <div className={stl.gridContent}>
          {reserves.length > 0 && reserves.map((reserve, index) => {
            return (
            <div key={reserve._id}> 
              <div className={stl.card} >
            
              <Image
                src={reserve.house.images_url}
                alt='image'
                width={300}
                height={300}
                priority
                className={stl.images}
              />
  
              <div className={stl.contact} >
                <span> Contato </span>
                <span>
                  
                  <a className={stl.link} href={`https://wa.me/${reserve.house.telefone}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços."  `} target='_blank'>
                    <FaWhatsappSquare size={50}  className={stl.ancora} />
                  </a>
 
                  
                </span>
  
              </div>
  
              <div className={stl.sectionInfo} >
                <span className={stl.locale}>
                <IoLocationSharp />
                  {reserve.house.location}
                </span>
                <span onClick={() => DeleteOneReserve(reserve._id)}> 
                  <FaRegTrashAlt size={20} className={stl.trashItem} /> 
                </span>
              </div>
              
            </div> 
            </div>
            )
          })}

        </div>
    </div>
  )
}




export default MyReserves
