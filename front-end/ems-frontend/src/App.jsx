import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListSongComponent  from './components/ListSongComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SongComponent from './components/SongComponent'
import ListAllUsersComponent from './components/ListAllUsersComponent'
import UserComponent from './components/UserComponent'
import ArtistComponent from './components/ArtistComponent'
import AdminComponent from './components/AdminComponent'
import UserHomepageComponent from './components/UserHomepageComponent';
import SearchPageComponent from './components/SearchPageComponent';
import UserLibraryComponent from './components/UserLibraryComponent';
import PlaylistSongsComponent from './components/PlaylistSongsComponent'
import AddSongToPlaylistComponent from './components/AddSongToPlaylistComponent';
import LoginComponent from './components/LogInComponent'
import PlaylistComponent from './components/PlaylistComponent';
import ArtistHomepageComponent from './components/ArtistHomepageComponent';
import ArtistLibraryComponent from './components/ArtistLibraryComponent';
import SignUpComponent from './components/SignUpComponent';

function App() {
  

  return (
    <>
      <BrowserRouter>
       <Routes>
        {/* http://localhost:3000/login */}
        <Route path='/login' element = { <LoginComponent/>}></Route>
        {/* http://localhost:3000/signup */}
        <Route path='/signup' element = { <SignUpComponent/>}></Route>
        {/* http://localhost:3000/songs */}
        <Route path='/songs' element = { <ListSongComponent/>}></Route>
        {/* http://localhost:3000/add-song */}
        <Route path='/add-song' element = {<SongComponent/>}></Route>
        {/* http://localhost:3000/edit-song/1 */}
        <Route path='/edit-song/:id' element = {<SongComponent/>}></Route>
         {/* http://localhost:3000/add-song */}
         <Route path='/add-song/:artistId' element = {<SongComponent/>}></Route>
        {/* http://localhost:3000/edit-song/1 */}
        <Route path='/edit-song/:id/:artistId' element = {<SongComponent/>}></Route>
        {/* http://localhost:3000/admin */}
        <Route path='/admin' element = {<AdminComponent/>}></Route>
        {/* http://localhost:3000/user */}
        <Route path='/user' element = {<ListAllUsersComponent/>}></Route>
        {/* http://localhost:3000/add-user */}
        <Route path='/add-user' element = {<UserComponent/>}></Route>
        {/* http://localhost:3000/edit-user/1 */}
        <Route path='/edit-user/:id' element = {<UserComponent/>}></Route>
        {/* http://localhost:3000/add-artist */}
        <Route path='/add-artist' element = {<ArtistComponent/>}></Route>
        {/* http://localhost:3000/edit-artist/1 */}
        <Route path='/edit-artist/:id' element = {<ArtistComponent/>}></Route>
        {/* http://localhost:3000/user-homepage/1 */}
        <Route path='/user-homepage/:id' element = {<UserHomepageComponent/>}></Route>
        {/* http://localhost:3000/search/1 */}
        <Route path='/search/:userType/:id' element = {<SearchPageComponent/>}></Route>
        {/* http://localhost:3000/search/1*/}
        <Route path='/artist-search/:id' element = {<SearchPageComponent/>}></Route>
        {/* http://localhost:3000/user-library/1 */}
        <Route path='/user-library/:id' element = {<UserLibraryComponent/>}></Route>
        {/* http://localhost:3000/add-song/user/1/1 */}
        <Route path='/add-song/:userType/:id/:playlistId' element = {<AddSongToPlaylistComponent/>}></Route>
        {/* http://localhost:3000/playlist-songs/user/1/1 */}
        <Route path='/playlist-songs/:userType/:id/:playlistId' element = {<PlaylistSongsComponent/>}></Route>
        {/* http://localhost:3000/create-playlist/user/1 */}
        <Route path='/create-playlist/:userType/:id' element = {<PlaylistComponent/>}></Route>
        {/* http://localhost:3000/edit-playlist/1 */}
        <Route path='/edit-playlist/:userType/:id/:playlistId' element = {<PlaylistComponent/>}></Route>

        {/* http://localhost:3000/artist-homepage/1 */}
        <Route path='/artist-homepage/:id' element = {<ArtistHomepageComponent/>}></Route>
        {/* http://localhost:3000/artist-library/1 */}
        <Route path='/artist-library/:id' element = {<ArtistLibraryComponent/>}></Route>

       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
