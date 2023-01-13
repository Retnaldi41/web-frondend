import axios from 'axios';

const url = "http://127.0.0.1:3000";
let token = sessionStorage.getItem('token')

export const link = axios.create({
    baseURL: url,
    headers: {
        'api_token': token
    }
});