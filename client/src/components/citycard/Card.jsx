import React, { useState } from 'react'
import './Card.css'
import { useEffect } from 'react';
import WType from '../WeatherIcon';
import {useNavigate} from 'react-router-dom';
import Ripples from 'react-ripples'

const Card = () => {
  const date=new Date().toLocaleDateString();
  const navigate=useNavigate();
  // const [time,setTime]=useState('');
  // setInterval(()=>{setTime(new Date().toLocaleTimeString())},1000)
  console.log(WType.Sunny);

    const [cities,setCities]=useState([]);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(false);

    const handleNextPage=()=>{
      if(page<3){
        setPage(page+1);
      }

    }
    
    const handlePrevPage=()=>{
      if(page>1){
        setPage(page-1);
      }
    }


      const fetchDetails = async () => {
      try{
        console.log("this is the page...");
        console.log(page);
        setLoading(true);
        const res = await fetch(`https://mausam-weather-app-five.vercel.app/api/weather/top30/paginated?page=${page}&limit=10`,{  
          method:'GET'
        });
        //to set the loading to true
        const data=await res.json();
        setCities(data);
        setLoading(false);
      }catch(err){
        console.log(err);

      }
    };

    useEffect(() => {
      fetchDetails();
    }, [page]);

    const somewhere=()=>{
      navigate('/map');
    }

    // console.log("hello this is card page");
    // console.log(cities);

  
  return (
    <div className='whole'>

    {!loading && <div className='pag1'>
        <button className='btn1' onClick={handlePrevPage}><img src='https://cdn-icons-png.flaticon.com/128/3415/3415823.png' alt='kuch vii' height='20px'/>prev</button>
          <ul>
            <li className='current active'>{page}</li>
          </ul>
            <button className='btn2' onClick={handleNextPage}>next<img src='https://cdn-icons-png.flaticon.com/128/126/126567.png' alt='kuch vii' height='20px'/></button>
      </div>  }

    {loading && <div className='full-load'><div class="loader"></div></div> }
    
    {cities.map((city,idx)=>{
      console.log(city);
      const kt=(city.weather[0].main);
      return (<div class="container" key={idx}>
      <div class="background">
        <div class="Circle1"></div>
      <div class="Circle2"></div>
      <div class="Circle3"></div>
      <div class="content">
        <h1 class="Condition"><img src={WType[kt] ? WType[kt] : WType.default} class="material-icons1" alt='no' />{city.weather[0].main}</h1>
        <h1 class="Temp">{(city.main.temp-273.15).toFixed(2)}°C</h1>
        <p class="max-min">feels Like: {(city.main.feels_like-273.15).toFixed(2)}°C</p>
        <h1 class="Time">{date} </h1>
        {/* <p class="Date"></p> */}
        <h1 class="Location"><i class="material-icons locationIcon">place</i> {city.name}, {city.sys.country}</h1>
          <button className='map-btn' onClick={somewhere}>View Map<img src='https://cdn-icons-png.flaticon.com/128/854/854184.png' className='nexts' alt='No...'/></button>
      </div>
    </div>
    </div>)})}<br/><br/>
    

    </div>
    
  )
}

export default Card
