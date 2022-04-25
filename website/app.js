/* Global Variables */
const PersonalAPI = "f8f0ecea0f2dc4f30ece6a3fc5cd3f27&units=imperial";    // API generated from OpenWeatherMap
const theGenerateButton = document.getElementById("generate");      // Selecting the button to allow events

// Create a new date instance dynamically with JS and add one to the month to be correct now
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1) +'.'+ d.getFullYear();

theGenerateButton.addEventListener("click", callback);              // Eventlistener calling with the callback function

async function callback(){
    const userIPZipCode = document.querySelector("#zip").value;     // Getting the zipcode from the input textbar in html
    // Getting the API from the openWeatherMap https://openweathermap.org/current using the zipcode entered
    const fetchedData =  await fetch(("https://api.openweathermap.org/data/2.5/weather?zip=" 
                                    + userIPZipCode + "&appid=" + PersonalAPI), {method: 'GET'});
    const textContent = document.querySelector('#feelings').value;      // Getting the text input from the user
    const responseData = await fetchedData.json();   // Collecting the stream and transforming/parsing it to readable data to be used
    const currentTemp = responseData.main.temp;   // getting the temperature value from the data fetched from the external API

       // post weather data on the server endpoint (Internal API)
    await fetch('/postWeatherData', {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({newDate, currentTemp, textContent})
        });
        // calling the GET ROUTE from the server endpoint
    const getResponse = await fetch('/weatherData');
    const finalOutput = await getResponse.json();
    try {
        document.getElementById('temp').innerHTML = "The current Temperature: " + Math.round(finalOutput.currentTemp) + " degrees";
        document.getElementById('content').innerHTML = "Your current feeling: " + finalOutput.textContent;
        document.getElementById("date").innerHTML ="Today's date: " + finalOutput.newDate;
        }
        catch(error) {
          console.log("error", error);
          // appropriately handle the error
        }
    }

