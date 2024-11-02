import axios from "axios";

const GlobalApi = axios.create({
    baseURL: "https://houseback-api.onrender.com/user/"
});


export const createUser = (data: any) => GlobalApi.post('/create', data); 

export const LoginUser = (data: any) => GlobalApi.post('/login', data);

export const getHouses = () => GlobalApi.get('/listarCasas');



