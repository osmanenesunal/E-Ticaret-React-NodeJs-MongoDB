const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid"); // uniqe değer için kullanılır
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
 
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://MongoDB:1@reacteticaretdb.bjk9aka.mongodb.net/?retryWrites=true&w=majority&appName=ReactEticaretDB";
mongoose
  .connect(uri)
  .then((res) => {
    console.log("Başarılı");
  })
  .catch((err) => {
    console.log("hatalı");
  });

// User Collection
const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String, //hata burada
  password: String,
});

const User = mongoose.model("User", userSchema);
// User Collection

//Product Collection

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  stock: Number,
  price: Number,
  imageUrl: String,
  categoryName:String
});

const Product = mongoose.model("Product", productSchema);

//Product Collection

//Basket Collection
const basketSchema = new mongoose.Schema({
  _id: String,
  productId: String,
  userId: String,
  count: Number,
  price: Number,
});

const Basket = mongoose.model("Basket", basketSchema);

//Basket Collection

// Order Collection

const orderSchema = new mongoose.Schema({
  _id: String,
  productId: String,
  userId: String,
  count: Number,
  price: Number,
});

const Order = mongoose.model("Order", orderSchema);
const options = {
  expiresIn: "1h",
};
// Order Collection

//Token
const secretKey = "Gizli anahtarim Gizli anahtarim Gizli anahtarim";
//Token

//Register İşlemim

app.post("/auth/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    let user = new User({
      _id: uuidv4(),
      email: email,
      name: name,
      password: password,
    });
    await user.save();
    const payload = {
      user: user,
    };
    const token = jwt.sign(payload, secretKey, options);
    res.json({ user: user, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Register İşlemim

//Login Methodum
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.find({ email: email, password: password });
    if (users.length == 0) {
      res.status(500).json({ message: "E-mail adresi veya password yanlış! " });
    } else {
      const payload = {
        users: users[0],
      };
      const token = jwt.sign(payload, secretKey, options);
      res.json({ user: users[0], token: token });
    }
  } catch (error) {}
});

//Product Listesi 
app.get("/products" , async(req , res ) =>{
    try {
        const products = await Product.find({}).sort({name:1})
        res.json(products)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
//Product Listesi 

//Dosya Kayıt İşlemi 
const storage = multer.diskStorage({
  destination: function(req, file, cb ){
    cb(null,"D:/Kişisel Çalışmalar/Project/ETicaret-React-NodeJs-MongoDB-/backend/uploads/")
  },
  filename:function(req,file,cb){
    cb(null,Date.now() + "-" + file.originalname)
  }
})
const upload=multer({storage:storage})


//Dosya Kayıt İşlemi 

//Add Product İşlemi 

app.post("/products/add" ,upload.single("image"), async (req, res) =>{
  try {
    const {name , categoryName , stock , price} =req.body;
    const product = new Product({
      _id: uuidv4(),
      name : name,
      stock : stock,
      price: price,
      categoryName:categoryName,
      imageUrl : req.file.path
    })
    await product.save()
    res.json({message:"Ürün Kaydı Başarıyla Tamamlandı"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

//Add Product İşlemi 




// Remove Product İşlemi 


app.post("/products/remove" , async(req ,res ) =>{
  try {
    const {_id} = req.body
    await Product.findByIdAndDelete(_id)
    res.json({message:"Silme işlemi başarıyla gerçekleşti!"})
  } catch (error) {
    res.status(500).json({message:error.message})
    console.log("Uygulama http://localhost:" + port + " üzerinden ayakta!");
  }
})


// Remove Product İşlemi 

const port = 5000;
app.listen(5000, () => {
  console.log("Uygulama http://localhost:" + port + " üzerinden ayakta!");
});
