import axios from "axios";


const REST_API_BASE_URL_USER = 'http://localhost:8080/user/login';
const REST_API_BASE_URL_ADMIN = 'http://localhost:8080/admin/login';
const REST_API_BASE_URL_ARTIST = 'http://localhost:8080/artist/login';


export const getAdmin = (credentials) => axios.post(REST_API_BASE_URL_ADMIN, credentials);

export const getUser = (credentials) => axios.post(REST_API_BASE_URL_USER, credentials);

export const getArtist = (credentials) => axios.post(REST_API_BASE_URL_ARTIST, credentials);
