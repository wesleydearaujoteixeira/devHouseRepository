'use client';

import axios from 'axios';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import register from './register.module.css';
import { RemoveSomethingOntheString } from '@/app/utils/RemoveString';

function CreateHouse() {
  const [storedId, setStoredId] = useState <string | null>(null);
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);

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

    if (!file || !description || !price || !location) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('images', file);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('telefone', telefone);
    formData.append('status', String(status));

    try {
      const token = storedId ? `Bearer ${JSON.parse(storedId)}` : '';
      const userId = storedUserId ? RemoveSomethingOntheString(storedUserId) : '';
      const url = `${process.env.NEXT_PUBLIC_URL_POSTING}/${userId}`;

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
      alert('Casa cadastrada com sucesso!');

    } catch (error: any) {
      console.error('Erro ao cadastrar casa:', error.response?.data || error.message);
      alert('Erro ao cadastrar casa.');
    }
  };

  return (
    <div className={register.content}>
      <form onSubmit={handleSubmit} className={register.form}>
        <div>
          <label> Imagem: </label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className={register.dic}>
          <label> Descrição: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
            cols={90}
          />
        </div>
        <div className={register.ajuste}>
          <label>Preço:</label>
          <input
            type="text"
            className={register.inputText}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={register.ajuste}>
          <label> Telefone: </label>
          <input
            type="text"
            className={register.inputText}
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <div className={register.ajuste}>
          <label> Localização: </label>
          <textarea
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            rows={5}
            cols={50}
          />
        </div>
        <div>
          <label> Status: </label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        <button type="submit" className={register.btn}> Cadastrar </button>
      </form>
    </div>
  );
}

export default CreateHouse;
