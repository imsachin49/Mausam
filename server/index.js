const express=require('express');
const app=express();
const port=process.env.PORT || 5000;
const bodyParser=require('body-parser');
const weatherRouter=require('./routes/weather');
const cors=require('cors');
require('dotenv').config();

// express.json is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// bodyparser is a middleware which is used to parse the incoming request 
// bodyparser.urlencoded is a method which parses the urlencoded payload and is based on body-parser.
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(cors({origin: true, credentials: true}));

app.use('/api/weather',weatherRouter);

app.listen(port,()=>{
    console.log('Server is running on port '+port);
})
