const express= require("express");
const  https= require("https");
const app =express();
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({entended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
  });
app.post("/",function(req,res){
  console.log();

  const query = req.body.cityName;
  const appkey = "410de7cabc544daef00fb96415603c2e";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + ",in&appid=" + appkey + "&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData= JSON.parse(data);
      console.log(weatherData);
      const temp= weatherData.main.temp;
      console.log(temp);
      const desc= weatherData.weather[0].description;
      console.log(desc);
      //const stringform= JSON.stringify(weatherData);
      //console.log(stringform);
      res.write("<h1>The weather is currently "+desc+".</h1>");
      res.write("<h1>The temp in " + query + " is "+temp+" degree Celsius.</h1>");
      res.write("<img src=https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png></img>");
      res.send();
  });
  });

});


app.listen(3000, function(){
  console.log("Server is running at port 3000");
});
