const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 8000;
const cors = require("cors");
// Configure dotenv package
require("dotenv").config();

const apiKey = process.env.API_KEY;
console.log("apikey",apiKey);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.post('/', async function(req, res) {
try {
    const city = await req.body.city;
    console.log("city", city);
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
   

    console.log(url);
    await axios.get(url).then((res1)=>{
        console.log("response", res1.data);
        const data = res1.data;
        res.status(200).json({
            message:"GET DATA SUCCESSFULLY",
            status:200,
            data:data
        })
     }).catch((error)=>{
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
     })

    // const json = await res.json();
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        message:"SOMETHING WENT WRONG",
        status:500
    })
}
})

app.listen(port, ()=>{
    console.log("listen on port : ",port);
})
