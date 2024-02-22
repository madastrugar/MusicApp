import React, {useState,useEffect} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom';

function Sidebar({ userId,userType }) {
  const[homepage, setHomepage] = useState(``)
  const[search, setSearch] = useState(``)
  const[library, setLibrary] = useState(``)
  //console.log(userType)

  useEffect(() => {
  if(userType == 'User')
  {
     setHomepage(`/user-homepage/${userId}`)
     setSearch(`/search/${userType}/${userId}`)
     setLibrary(`/user-library/${userId}`)
  }
  else if(userType == 'Artist'){
    setHomepage(`/artist-homepage/${userId}`)
    setSearch(`/search/${userType}/${userId}`)
    setLibrary(`/artist-library/${userId}`)
  }
}, [userId, userType]);
  //console.log(homepage)
 // console.log(library)

  return (
    <div className='sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100'>
      <div>
        <a href='' className='nav-link text-white'>
            <i className='bi bi-vinyl fs-5 me-2'></i>
            <span className='fs-4'>Music app</span>
        </a> 
        <hr className='text-secondary mt-2'/>
        <ul className='nav nav-pills flex-column p-0 m-0'>
            <li className='nav-item p-1'>
                <Link to={homepage} className='nav-link text-white'>
                    <i className='bi bi-house fs-5 me-2'></i>
                    <span className='fs-5'>Home</span>
                </Link>
            </li>
            <li className='nav-item p-1'>
                <Link to= {search} className='nav-link text-white'>
                    <i className='bi bi-search-heart fs-5 me-2'></i>
                    <span className='fs-5'>Search</span>
                </Link>
            </li>
            <li className='nav-item p-1'>
                <Link to={library} className='nav-link text-white'>
                    <i className='bi bi-collection fs-5 me-2'></i>
                    <span className='fs-5'>Your library</span>
                </Link>
            </li>
        </ul>
       </div>
        <div>
           <hr className='text-secondary'/>
           <Link to={`/login`} className='nav-link text-white'>
                    <i className='bi bi-person fs-5 me-2'></i>
                    <span className='fs-5'>Log out</span>
                </Link>
           
        </div>
    </div>
  )
}

export default Sidebar