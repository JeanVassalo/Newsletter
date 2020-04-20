const request = require("request")
const express=require("express")
const bodyParser=require("body-parser")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
    var firstName=req.body.firstName
    var lastName=req.body.lastName
    var email=req.body.email
    var data={
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }
    var jsonData=JSON.stringify(data)
    var options={
        url: "https://usX.api.mailchimp.com/3.0/lists/'SET HERE YOUR API ID'",//remember to replace the 'X' with the server number
        method: "POST",
        headers:{
            "Authorization": "jean2 'SET HERE YOUR API KEY'"
        },
        body: jsonData
    }

    request(options, function(error,response,body){
        if(error){
            console.log(error);            
        }else{
            console.log(response.statusCode);
            
        }
    })

    //console.log(firstName, lastName, email)
})

app.listen(3000, function(){
    console.log("Server is running on port 3k")
})

