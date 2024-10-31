'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import profile from '../../Category/category.module.css';
import { casas } from "../../types/TypesObject";
import Image from "next/image";
import { MdEditNote } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";




const Perfil = () => {

    const [houses, setHouses] = useState <casas[]> ([]);
    
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

  const removeQuotesFromString = (userId: string | null) => {
    return userId ? userId.replace(/"/g, "") : "";
  };

  // Função para buscar as casas do usuário
  const fetchUserHomes = async (token: string, userId: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_ENCODING}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Response:", response.data.casas);
      setHouses(response.data.casas);

    } catch (error: any) {
      console.error(
        "Erro ao trazer os dados:",
        error.response?.data || error.message
      );
    }
  
};

  useEffect(() => {
    if (typeof window !== "undefined") {
    

      if (token && userId) {
        // Chamar a função de busca após garantir que temos os valores necessários
        fetchUserHomes(token, removeQuotesFromString(userId));
      } else {
        console.warn("Token ou user_id ausente.");
      }
    }
  }, []);


  const deleteOnHouse = async (id: string) => {

    const confirmation = confirm("Deseja deletar essa casa?");

    if(!confirmation) {
      return;
    }


    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL_DELETE}/${id}/${removeQuotesFromString(userId)}`,
        
        {
          
          headers: {
            Authorization: `Bearer ${token && JSON.parse(token) }`,
            'Content-Type': 'multipart/form-data',
          },

        }
      );

      console.log('Response:', response.data);
      alert('Casa deletada com sucesso');

    } catch (error: any) {
      console.error('Erro ao deletar casa:', error.response?.data || error.message);
      alert('Erro ao deletar esta casa.');
    }finally {
      setTimeout(() => {
        location.reload();
      }, 500)
    }
  
  }
  

  return (

      <div className={profile.center} >
        {houses.length > 0 && houses.map((casa, index) => {
            return (
            <div className={profile.cart} key={index}>
                <section className={profile.info}  >
                    <Image
                            src={casa?.images_url}
                            alt={'sac'}
                            width={300}
                            height={300}
                            priority
                    />
                        <p> {casa.description} </p>
                    </section>
      
                <div className={profile.cartReserve}>
                    
                    <div className={profile.dash} >
                      <h2> R$ {casa.price} </h2>
                      <h3> <MdLocationOn/> {casa.location} </h3>
                    </div>

                      <div className={profile.crud_specific} >
                        <span className={profile.edit}>  
                            <Link href={`/edit-acess/${casa.id}`}>
                              <MdEditNote size={20}/>
                            </Link>  
                        </span>
                        <span className={profile.excluir} onClick={() => deleteOnHouse(casa.id)}> <FaRegTrashCan size={20}/> </span>
                      </div>
                </div>
                </div>
                )
            }) }

            {houses.length == 0 && (
              <div>
                <h2> Não há casas cadastradas </h2>
                <p> Se não há casas cadastradas cadastre uma agora </p>
                <Link href='/post-acess'>  
                  <button className={profile.btn} > Nova Casa </button>
                </Link>
              </div>
            )}
      </div>
  )
};

export default Perfil;