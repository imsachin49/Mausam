const express=require('express');
const router=express.Router();
require('dotenv').config();
const apiKey=process.env.API_KEY;
const axios=require('axios');
const cities=require('../cities');

router.get('/top30',async(req,res)=>{
    try{
        const allData=await Promise.all(cities.map(async(city)=>{
            const url=`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`
            const response=await axios.get(url);
            return response.data;
        }
        ))
        res.status(200).json(allData);
    }catch(err){
        res.status(500).json({message:err.message});
        console.log(err);
    }
})

// pagination for the cities
router.get('/top30/paginated',async(req,res)=>{
    try{
        const allData=await Promise.all(cities.map(async(city)=>{
            const url=`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`
            const response=await axios.get(url);
            return response.data;
        }
        ))
        //adding pagination to the data
        let page=Number(req.query.page) || 1;
        let limit=Number(req.query.limit) || 10;
        // skip the number of items specified in the query
        let skip=(page-1)*limit;
        let paginatedData=allData.slice(skip,skip+limit);
        res.status(200).json(paginatedData);
        console.log(paginatedData);
    }catch(err){
        res.status(500).json({message:err.message});
        console.log(err);
    }
})

// search for a single city....
router.get('/',async(req,res)=>{
    const {city}=req.query;
    console.log(city);
    try{
        console.log('ghush gya');
        const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        const response=await axios.get(url);
        console.log(response);
        res.status(200).json(response.data);
    }catch(err){
        res.status(500).json({message:err.message});
        console.log(err);
    }
})

module.exports=router;
