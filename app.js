const express = require("express")
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));




app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    const city = req.body.cityName
    const apiKey = "eb8f6b02c1e4a49c5d495c77535f82c8";
    const unit = "units=metric#"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${unit}`
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            let weatherMadrid = `<h1>The temperature is ${city} is ${temp} degrees celcius today</h1>`
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