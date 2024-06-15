import { useState } from "react";

function ProductComponent(){
    const [products , setProducts] = useState([])
    return(
        <>
                <div className="container mt-4">
                <div className="card">
                    <div className="card-header"> 
                    <h1>Ürün Listesi</h1>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Ürün Adı </th>
                            <th>Kategori Adı </th>
                            <th>Adet </th>
                            <th>Fiyat </th>
                            <th>İşlemler </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product,index)=>(
                                <tr>
                                     <td>{index + 1}</td>   
                                     <td>{product.name}</td>   
                                     <td>{product.categoryName}</td>   
                                     <td>{product.stock}</td>   
                                     <td>{product.price}</td>   
                                     <td><button className="btn btn-outline-danger btn-sm">
                                        Sil </button >
                                    </td>   


                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>

                </div>


                </div>


        </>
    )
}

export default ProductComponent; 
