import axios from "axios";

const REST_API_BASE_URL_USER = 'http://localhost:8080/user';
const REST_API_BASE_URL_ARTIST = 'http://localhost:8080/artist';
const REST_API_BASE_URL_USER_CHECK = 'http://localhost:8080/user/checkUser';
const REST_API_BASE_URL_ARTIST_CHECK = 'http://localhost:8080/artist/checkArtist';

export const registerUser = (credentials) => axios.post(REST_API_BASE_URL_USER, credentials);

export const registerArtist = (credentials) => axios.post(REST_API_BASE_URL_ARTIST, credentials);

export const getUser = (credentials) => axios.post(REST_API_BASE_URL_USER_CHECK, credentials);

export const getArtist = (credentials) => axios.post(REST_API_BASE_URL_ARTIST_CHECK, credentials);
