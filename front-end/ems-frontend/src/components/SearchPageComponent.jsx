import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getSongsByTitle, getSongsByArtist,getSongsByGenre, getSongsByKeyword } from '../services/SongService';

const SearchPageComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsTitle, setResultsTitle] = useState([]);
  const [resultsGenre, setResultsGenre] = useState([]);
  const [resultsArtist, setResultsArtist] = useState([]);
  const [resultsKeyword, setResultsKeyword] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const {userType} = useParams('');
  const {id} = useParams('');

  function getSongTitle(searchData){
    getSongsByTitle(searchData).then((response) => {
        setResultsTitle(response.data);
    }).catch(error => {
        console.error(error);
    })
  }

  function getSongArtist(searchData){
    getSongsByArtist(searchData).then((response) => {
        setResultsArtist(response.data);
    }).catch(error => {
        console.error(error);
    })
  }

  function getSongGenre(searchData){
    getSongsByGenre(searchData).then((response) => {
        setResultsGenre(response.data);
    }).catch(error => {
        console.error(error);
    })
  }

  function getSongKeyword(searchData){
    getSongsByKeyword(searchData).then((response) => {
        setResultsKeyword(response.data);
    }).catch(error => {
        console.error(error);
    })
  }
  //console.log(searchQuery)
  const handleSearch = async () => {
    try {
    
      const searchData = {"keyword" : searchQuery}
      setSearchResults([]);

      getSongTitle(searchData);
      getSongGenre(searchData);
      getSongArtist(searchData);
      getSongKeyword(searchData);

      const combinedResults = [];
      if(resultsTitle.length>0){
        setSearchResults(resultsTitle);
      }
      if(resultsGenre.length>0){
        setSearchResults(resultsGenre);
      }
      if(resultsArtist.length>0){
        setSearchResults(resultsArtist);
      }
      if(resultsKeyword.length>0){
        setSearchResults(resultsKeyword);
      }
      
     
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className='d-flex'>
      
        <div className='col-md-2'>
           <Sidebar userId={id} userType={userType}/>  
        </div>
        <div className='row'>  
        <div>
        <label>Search: </label>
        <input 
               type="text"
               placeholder='Search here'
               value={searchQuery} 
               onChange={(e) => setSearchQuery(e.target.value)} 
        />
         <button onClick={handleSearch}>Search</button>
    </div>
    {/* Display search results */}
    {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <table className='table table-bordered'>
          <tbody>
              
             {searchResults.map((result) => 
               <tr key={result.id}>
                   <td>{result.title}</td>
                   <td>{result.artist}</td>
                   <td>{result.genre}</td>
                </tr>
              )}
              </tbody>
          </table>
        </div>
      )}
      { searchResults.length == 0 && (
        <h2>No results</h2>
      )

      }
      </div>
    </div>

    
  )
}

export default SearchPageComponent
