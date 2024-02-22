import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/playlists';

const REST_API_BASE_URL_USER = 'http://localhost:8080/user/playlists';

const REST_API_BASE_URL_ARTIST = 'http://localhost:8080/artist/playlists';

export const listPlaylists = () => axios.get(REST_API_BASE_URL);

export const listUserPlaylists = (userId) => axios.get(REST_API_BASE_URL_USER + '/' + userId);

export const listArtistPlaylists = (artistId) => axios.get(REST_API_BASE_URL_ARTIST + '/' + artistId);

export const createPlaylist = (userId,playlist) => axios.post(REST_API_BASE_URL_USER + '/' + userId, playlist);

export const createPlaylistArtist = (artistId,playlist) => axios.post(REST_API_BASE_URL_ARTIST + '/' + artistId, playlist);

export const getPlaylist = (playlistId) => axios.get(REST_API_BASE_URL + '/' + playlistId);

export const updatePlaylist = (playlistId, playlist) => axios.put(REST_API_BASE_URL + '/update/' + playlistId, playlist);

export const addSongToPlaylist = (playlistId, songId) => axios.put(REST_API_BASE_URL + '/' + playlistId + '/' + songId);

export const removeSongFromPlaylist = (playlistId, songId) => axios.put(REST_API_BASE_URL + '/delete/' + playlistId + '/' + songId);

export const deletePlaylist = (userId,playlistId) => axios.delete(REST_API_BASE_URL +'/' + userId+ '/' + playlistId);
export const deletePlaylistArtist = (artistId,playlistId) => axios.delete(REST_API_BASE_URL +'/artist/' + artistId+ '/' + playlistId);