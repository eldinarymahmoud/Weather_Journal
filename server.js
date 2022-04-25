// Endpoint object for all routes
projectData = {};

// When installing the express or any other package
// it's confirmed as dependant in the package.json file with the version number
const express = require('express');
const bodyParser = require('body-parser');         
const cors = require('cors');
const res = require('express/lib/response');

// Declaring the port number
const port = 8000;

// Variable app is an instance of express
const app = express();

////////////////////////////
        //Middleware//
////////////////////////////

// The body-parser package should be installed and included in the project.
// Bodyparser is useful it sees the stream input and transform it into java script object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// The Express app instance is pointed to the project folder that contains .html, .css, and .js files.
// if we type localhost:1000/app.js it will open the file...etc.
app.use(express.static('website'));

// Listen to the port (above defined 8000), print in the console listening indication
// Running it via terminal using the command line node server.js, check out the console output
const server = app.listen(port, ()=>{
        console.log("Server is currently running on localhost: " + port);
  });

// Get request returning project data
app.get('/weatherData', (request, response)=>{
        response.send(projectData);
});

// Get request returning project data
app.get('/all', (request, response)=>{
        response.send(projectData);
});

// POST route
app.post('/postWeatherData', (request, response)=>{
        projectData.currentTemp = request.body.currentTemp;                   // alternative is using the sprea operation, put everything in the object
        projectData.newDate = request.body.newDate;                   // projectData = {...request.body};       
        projectData.textContent = request.body.textContent;     
        response.send();                                                // Ending the process
      });

