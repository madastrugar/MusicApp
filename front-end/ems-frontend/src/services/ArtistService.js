import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/artist';


export const listArtists = () => axios.get(REST_API_BASE_URL);

export const listSongs = (artistId) => axios.get(REST_API_BASE_URL + '/songs/'+ artistId);

export const createArtist = (artist) => axios.post(REST_API_BASE_URL,artist);

export const getArtist = (artistId) => axios.get(REST_API_BASE_URL + '/' + artistId);

export const getArtistGenres = (artistId) => axios.get(REST_API_BASE_URL + '/genres/' + artistId);

export const updateArtist = (artistId, artist) => axios.put(REST_API_BASE_URL + '/' + artistId, artist);

export const deleteArtist = (artistId) => axios.delete(REST_API_BASE_URL + '/' + artistId);