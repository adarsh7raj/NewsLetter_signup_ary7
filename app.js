require('dotenv').config();

const cors=require("cors");
const express=require("express"); 
const body_parser=require("body-parser");
//const request=require("request");

const https=require("https");
const app=express();
app.use(cors());
app.use(express.static("public"));
app.use(body_parser.urlencoded({extended:true}));    
app.get("/",function(req,res){
  
    res.sendFile(__dirname+"/signup.html");
   
});


app.post("/",function(req,res){
    const fname=req.body.fname;     
    const lname=req.body.lname;
    const email=req.body.email;
    console.log(fname,lname,email);
    const data={
        members:[
        {  
            email_address:email,
            status:"subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
            
        }
        ]
    }
const jsonData= JSON.stringify(data);
const url="https://us8.api.mailchimp.com/3.0/lists/2f488bc798";
const options={
    method:"POST",
    auth:`anystring:${process.env.MAILCHIMP_API_KEY}`
}
const request=https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/sucess.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data){
    console.log(JSON.parse(data));
});


});
request.write(jsonData); //to send data to the mailchimp server site.
request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("server is up and running");
});
    
