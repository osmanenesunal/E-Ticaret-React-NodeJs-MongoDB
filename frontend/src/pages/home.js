import axios from "axios";
import { useEffect, useState } from "react";

function HomeComponent() {
  const [products, setProducts] = useState([]);

  const getAll = async () => {
    var response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getAll();
  }, []);
  const addBasket =async(productId) =>{
    let user = JSON.parse(localStorage.getItem("user"))
    let model = {productId: productId , userId : user._id }
    var response = await axios.post("http://localhost:5000/baskets/add", model)
    alert(response.data.message)
    getAll()

  }




  return (
    <>
      <div className="container">
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-3">
              <div className="card">
                <div key={index} className="card-header">
                  <h4>{product.name}</h4>
                </div>

                <div className="card-body">
                <img style={{width:"180px", height:"150px"}} src={"http//localhost:5000" + product.imageUrl}></img>
                <h4 style={{border:"1px solid #ccc" , padding:"10px "}} className="text-center mt-2">Stok Adedi: {product.stock}
                 </h4>
                 <h4 style={{border:"1px solid #ccc" , padding:"10px "}} 
                 className="text-center text-danger mt-2 ">Fiyat: {product.price} TL
                 </h4>
                 {product.stock > 0 ?
                 <button onClick={()=>addBasket(product._id)} className="btn btn-outline-success w-100">Sepete Ekle</button>
                :
                 <button  className="btn btn-danger w-100">Ürün Stokta Yok!</button>
                  } </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
