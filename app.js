var express = require('express');
var app = express();
var port = 3000
const cors = require('cors');
const { connectToMongoDB } = require('./db/db');
const bodyParser = require('body-parser');
const routes = require('./routes');
app.use(bodyParser.json({limit: '200mb'}));
const revenueRoutes = require('./routes');
const loadData = require('./loadDataRoutes');

app.use(cors());
app.use('/api/revenue', revenueRoutes);
app.use('/api/data', loadData);
app.listen(port, async() =>{
  console.log('server running on port number');
  try{
    await connectToMongoDB();
    console.log('MongoDB connected successfully');
  } catch(error){
    console.log('MongoDB connection failed Error:', error);
  }
})
