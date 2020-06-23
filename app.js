const express = require("express")
const https = require("https");

const app = express();





app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=eb8f6b02c1e4a49c5d495c77535f82c8&units=metric#"
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            let weatherMadrid = `<h1>The temperature is Madrid is ${temp} degrees celcius today</h1>`
            let weatherMadridDescription = `<h1>And the weather is currently ${description}</h1>`
            let icon = weatherData.weather[0].icon
            const imgUrl = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;

            res.send( weatherMadrid + weatherMadridDescription + imgUrl)
        })
    })
})



app.listen(4000, function(){
    console.log("Server running on port 4000");
})