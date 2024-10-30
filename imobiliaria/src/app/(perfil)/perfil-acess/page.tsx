'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import profile from '../../Category/category.module.css';
import { casas } from "../../types/TypesObject";
import Image from "next/image";

const Perfil = () => {

    const [houses, setHouses] = useState <casas[]> ([])

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
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      if (token && userId) {
        // Chamar a função de busca após garantir que temos os valores necessários
        fetchUserHomes(token, removeQuotesFromString(userId));
      } else {
        console.warn("Token ou user_id ausente.");
      }
    }
  }, []);

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
      
                <div className={profile.cartReserve} >
                    <h2> R$ {casa.price} </h2>
                      <div className={profile.crud_specific} >
                        <span> Editar </span>
                        <span> Excluir </span>
                      </div>
                </div>
                </div>
                )
            }) }
      </div>
  )
};

export default Perfil;