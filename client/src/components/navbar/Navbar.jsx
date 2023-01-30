import React from 'react'
import './Navbar.css'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // const nav=useNavigate();
  const [location,setLocation] = useState('');
  
  // const handleSearch=async(e)=>{
  //   setLocation(e.target.value);
  //   if(location?.trim().length>0){
  //     navigate(`/search?city=${e.target.value.trim()}`);
  //   }
  // }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(location?.trim().length>0){
      navigate(`/search?city=${location.trim()}`);
    }
    else{
      console.log("hello heloo");
      navigate('/');
    }
    setLocation('');
  }

  return (
    

    <div className='nav-container'>
        <div className='nav'>
            <NavLink className='logo' to='/'>
              <img src='https://cdn-icons-png.flaticon.com/128/1684/1684375.png' alt='logo' className='logo-img'/>
              <h5 className='logo-text'>Mausam</h5>
            </NavLink>
          {/* <div className='some-search'> */}
          <form className='some-search' onSubmit={handleSubmit}>
            <input type="text" placeholder='Location search' className='search' onChange={e=>setLocation(e.target.value)} name='location' value={location}/>
            <input type="text" placeholder='City search' className='search1' onChange={e=>setLocation(e.target.value)} name='location' value={location}/>
            <button type='submit' className='sicon'>
              <img src='https://cdn-icons-png.flaticon.com/128/954/954591.png' alt='search city...' className='search-icon'/>
            </button>
          </form>
          {/* </div> */}
        </div>
    </div>
  )
}

export default Navbar
