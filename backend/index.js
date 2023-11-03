const express  = require("express");
const cors =  require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express()
app.use(cors())
app.use(express.json({limit: "10mb"}));

//mongo connect
const PORT =  process.env.PORT || 8080;
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connected to the database"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        unique: true,
    },
    password: String,
    confirmpassword: String,
    image : String,
})

//model
const userModel = mongoose.model("User",userSchema)

app.get("/",(req,res)=>{
    res.send("server is running");
})
//sign up
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    const result = await userModel.findOne({ email: email });
    console.log(result);
    if(!result){
        const data = userModel(req.body)
        const save =  data.save();
        res.send({message : "successfully sign up",alert : true});
    }else{
        res.send({message : "email is already addded.",alert : false});
    }
     
  });
//login
app.post("/login", async (req, res) => {
    console.log(req.body);
    const {email} = req.body;
    // const {password} = req.body;
    const result = await userModel.findOne({email: email});
    if(result){
        const datasend = {
            _id : result._id,
            firstName  : result.firstName,
            lastName : result.lastName,
            email : result.email,
            image : result.image,
        }
        console.log(datasend);
        res.send({message: "login suuccessfully",alert :true,data:datasend});
    }
    else{
        res.send({message: "email is not available, please signup",alert :false}); 
    }
    

    

  });
app.listen(PORT,()=>console.log("server is running at port : " + PORT))