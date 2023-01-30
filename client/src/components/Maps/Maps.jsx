import React, { useEffect, useState } from 'react';
import './Maps.css';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {Link} from 'react-router-dom'

const MarkerIcon=new L.icon({
  iconUrl:"https://cdn-icons-png.flaticon.com/128/5836/5836608.png",
  iconSize:[45,45],
  iconAnchor:[17,45],
  popupAnchor:[1,-45],
})

const Maps = () => {
  const MapPosition=[28.6667,77.2167];
  const [cities,setCities]=useState([]);
  const [page,setPage]=useState(1);
  
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
      const res = await fetch(`http://localhost:5000/api/weather//top30/paginated?page=${page}&limit=10`,{  
        method:'GET'
      });
      const data=await res.json();
      setCities(data);
    }catch(err){
      console.log(err)
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [page]);

  return (
    <div className='maps'>
      <MapContainer className='map' center={[MapPosition[0],MapPosition[1]]} zoom={4}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {cities.map((city)=>{
        {/* console.log((city.main.temp-273).toFixed(2)); */}
        const lat=(city.coord.lat);
        const lon=(city.coord.lon);
        return (<Marker position={[lat,lon]} icon={MarkerIcon}>
          <Popup className='pop'><b className='bld'>{city.name}<br/>{((city.main.temp)-273).toFixed(2)}°C</b></Popup>
        </Marker>)
      })}
      </MapContainer>

      <div className='pag'>
        
        <button className='btn1' onClick={handlePrevPage}><img src='https://cdn-icons-png.flaticon.com/128/3415/3415823.png' alt='kuch vii' height='20px'/>prev</button>
          <ul>
            <li className='current active'>{page}</li>
          </ul>
        <button className='btn2' onClick={handleNextPage}>next<img src='https://cdn-icons-png.flaticon.com/128/126/126567.png' alt='kuch vii' height='20px'/></button>
      </div>  

    </div>
  )
}

export default Maps
