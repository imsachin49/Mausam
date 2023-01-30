import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import WType from '../WeatherIcon';
import './Search.css';

const Search = () => {
    const location = useLocation();
    const [city, setCity] = useState('');
    const [loading, setLoading] =useState(false);
    const query = new URLSearchParams(location.search);
    const mycity=(query.get('city'));
    const [error,setError]=useState(false);
    const [code,setCode]=useState(null);

    const fetchDetails = async () => {
        try{
          setLoading(true);
          const res = await fetch(`https://mausam-weather-app-five.vercel.app/api/weather?city=${mycity}`,{  
            method:'GET'
          });
          //to set the loading to true
          const data=await res.json();
          setCity(data);
          setLoading(false);
          setCode(res.status);
        }catch(err){
          console.log(err);
          setError(true);
        }
      };
  
      useEffect(() => {
        fetchDetails();
      }, [mycity]);

      const date=new Date().toLocaleDateString();
      
      return (
        
        <div className='whole1'>
        {loading && <div className='full-load'><div class="loader"></div></div> }
        {error && <div className='full-load'><h1 className='error'>Error Occured</h1></div>}
          {city && <div class="container">
          <div class="background">
            <div class="Circle1"></div>
            <div class="Circle2"></div>
            <div class="Circle3"></div>
            <div class="content">
              <h1 class="Condition"><img src={WType[city.weather[0].main] ? WType[city?.weather[0].main] : WType.default} class="material-icons1" alt='no' />{city?.weather[0].main}</h1>
              <h1 class="Temp">{(city?.main.temp-273.15).toFixed(2)}°C</h1>
              <p class="max-min">feels Like: {(city?.main.feels_like-273.15).toFixed(2)}°C</p>
              <h1 class="Time">{date} </h1>
              <p class="Date"></p>
              <h1 class="Location"><i class="material-icons locationIcon">place</i> {city?.name}, {city?.sys.country}</h1>
              {/* <button className='map-btn'>View Map<img src='https://cdn-icons-png.flaticon.com/128/854/854184.png' className='nexts' alt='No...'/></button> */}
              <p className='cont'>
                <span className='cont1'>Humidity: {city?.main.humidity}%</span>
                <span className='cont2'>Wind: {city?.wind.speed}km/h</span>
              </p>
            </div>
          </div>
          </div>}
      </div>
  )
}

export default Search
