'use client';

import axios from 'axios';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import register from './register.module.css';

function CreateHouse() {
  const [storedId, setStoredId] = useState<string | null>(null);
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);

  // Checa se estamos no cliente antes de acessar localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStoredId(localStorage.getItem('token'));
      setStoredUserId(localStorage.getItem('user_id'));
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();




    const RemoveSomethingOntheString = (uer_id: string | null) => {
      const userIdValid = uer_id ? uer_id.replace(/"/g, '') : "";
      return userIdValid;

    }

    if (!file || !description || !price || !location) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('images', file);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('status', status.toString());

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_POSTING}/${RemoveSomethingOntheString(storedUserId)}`,
        formData,
        {
          
          headers: {
            Authorization: `Bearer ${ storedId && JSON.parse(storedId) }`,
            'Content-Type': 'multipart/form-data',
          },

        }
      );

      console.log('Response:', response.data);
      alert('Casa cadastrada com sucesso!');

    } catch (error: any) {
      console.error('Erro ao cadastrar casa:', error.response?.data || error.message);
      alert('Erro ao cadastrar casa.');
    }
  
  }


  return (
    <div className={register.content}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imagem:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label> Descrição: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            cols={50}
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Localização:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        <button type="submit">Cadastrar Casa</button>
      </form>
    </div>
  );
}

export default CreateHouse;
