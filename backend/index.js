const mongoose = require("mongoose")
const express = require("express")
const app = express() 
const {v4:uuidv4} = require("uuid")// uniqe değer için kullanılır
const multer = require("multer")
const cors = require("cors")
const jwt = require("jsonwebtoken")


app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://MongoDB:1@reacteticaretdb.bjk9aka.mongodb.net/?retryWrites=true&w=majority&appName=ReactEticaretDB"
mongoose.connect(uri).then(res=>{console.log("Başarılı")}).catch(err=>{console.log("hatalı")})

// User Collection
const userSchema = new mongoose.Schema({
    _id:String , 
    name : String, 
    mail: String,
    password : String , 

})

const User = mongoose.model("User" , userSchema) 
// User Collection

//Product Collection

const productSchema = new mongoose.Schema({
    _id: String, 
    name : String, 
     stock : Number, 
     price : Number,
    imageUrl : String , 

})

const Product  = mongoose.model("Product" ,productSchema)

//Product Collection

//Basket Collection 
const basketSchema = new  mongoose.Schema({
    _id:String, 
    productId :String, 
    userId : String,
    count: Number,
    price:Number,
})

const Basket = mongoose.model("Basket" , basketSchema)

//Basket Collection 

// Order Collection 

const orderSchema  = new mongoose.Schema({
    _id:String, 
    productId :String, 
    userId : String,
    count: Number,
    price:Number,
    
})

const Order = mongoose.model("Order" , orderSchema)
const options = {
    expiresIn:"1h"
}
// Order Collection 


//Token
const secretKey = "Gizli anahtarim Gizli anahtarim Gizli anahtarim"
//Token

//Register İşlemim 

app.post("auth/register", async (req,res)=>{
try {
    const {name , email, password} =req.body
    let user = new User({
        _id: uuidv4(),
        name : name,
        email:email,
        password:password
    })
    await user.save()
    const payload = {
        user : user
    }
    const token = jwt.sign(payload, secretKey, options)
    res.json({user:user , token:token})
} catch (error) {
    res.status(500).json({error:error.message})
}


})
//Register İşlemim 


//Login Methodum 
app.post("auth/login" ,async(req, res) =>{
    try {
        const {email, password} = req.body;
        const users = await User.find({email: email , password : password})   
        if(users.length == 0 ){
            res.status(500).json({message:"E-mail adresi veya password yanlış! "})
        }
        else{
            const payload ={
                users:users[0]
            }
            const token = jwt.sign(payload, secretKey, options)
            res.json({user:users[0] , token:token})
        }
      
    } catch (error) {
        
    }
})










const port = 5000;
app.listen(5000, () =>{
    console.log("Uygulama http://localhost:" + port + " üzerinden ayakta!")
})