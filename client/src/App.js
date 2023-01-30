import './App.css';
import Home from './pages/Home'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Maps from './components/Maps/Maps';
import Card from './components/citycard/Card';
import Search from './components/Search/Search';
import { useState,useEffect } from 'react';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Maps/>} />
          <Route path="/card" element={<Card/>} />
          <Route path="/search" element={<Search/>} />
        </Routes>
      <Footer />
      </Router>
    </div>
  );
}

export default App
