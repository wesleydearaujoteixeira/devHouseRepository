'use client';

import { useEffect } from "react";
import axios from "axios";


export const Perfil = () => {



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
      console.log("Response:", response.data);
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
        //setStoredId(token);
        //setStoredUserId(userId);

        // Chamar a função de busca após garantir que temos os valores necessários
        fetchUserHomes(token, removeQuotesFromString(userId));
      } else {
        console.warn("Token ou user_id ausente.");
      }
    }
  }, []);

  return <div>Perfil</div>;
};
