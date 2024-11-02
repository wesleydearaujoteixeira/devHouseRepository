export type HouseTypes = {
    images: string;
    description: string;
    price: number;
    location: string;
    status: boolean;
    owner: string;
    _id: string;
    __v: number;
    images_url: string;
    id: string;
  }
  

export type casas = {
    id: string;
    description: string;
    images: string;
    images_url: string;
    location: string;
    owner: string;
    price: number;
    status: boolean;
}

export type  Appointment = {
  date: string; // Date em formato ISO 8601
  house: House;
  owner: string; // ID do proprietário
  _id: string;
  __v: number;
}

export type House = {
  id: string;
  description: string;
  images: string; // Nome do arquivo de imagem
  images_url: string; // URL da imagem
  location: string;
  owner: string; // ID do proprietário
  price: number;
  status: boolean;
  telefone: string;
  _id: string;
  __v: number;
}

    
