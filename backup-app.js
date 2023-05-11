const express=require("express");
const https=require("https");
app=express();
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    const city="noida";
    const teampreature="metric";
https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a1b5e0c899ab7f1f053ff356ce2ad6db&units="+teampreature+"",function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherdata=JSON.parse(data);
        const temp=weatherdata.main.temp;
        const icon=weatherdata.weather[0].icon;
        const imageurl= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        
        res.write("<h1>teampreature in noida is:"+temp+"degree celcius.</h1>");
          res.write("<img src='https://openweathermap.org/img/wn/"+icon+"@2x.png'>");
        res.send();
    });
});

});



app.listen(3000,function(){});