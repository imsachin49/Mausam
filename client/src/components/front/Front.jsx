import React from 'react'
import './Front.css'
import Typewriter from "typewriter-effect";
import { Link } from 'react-router-dom';

const Front = () => {
  return (
    <div className='front'>
        {/* <h3>Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there is really no such thing as bad weather, only different kinds of good weather.</h3> */}
        <h1 className='write'>
          <Typewriter
        onInit={(typewriter)=> {
        typewriter
        // .typeString("Climate is what we expect, weather is what we get.")
        .typeString("Wherever you go, no matter what the weather, always bring your own sunshine.")
        .pauseFor(1000)
        .deleteAll()
        .typeString("Welcome to Mausam web App Explore Now 👇")
        .start();
        }}
        />
        </h1>
        <Link className='container1' to='/card'>
          <button className='button-explore'>Explore
          <img src='https://cdn-icons-png.flaticon.com/128/724/724820.png' className='nexts' alt='No...'/>
          </button>
        </Link>
    </div>
  )
}

export default Front
