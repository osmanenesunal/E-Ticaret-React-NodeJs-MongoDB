import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginComponent(){
    const navigate =useNavigate()
    const   [email , setEmail]  = useState("");
    const [password , setPassword] = useState("");

    const login = async (e)=>{
        e.preventDefault()
        try {
            let model = {email:email , password:password};
            const response = await axios.post("http://localhost:5000/auth/login", model)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/")
        }
         catch (error) {
            console.error(error)
        }

    }
    return(
        <>
            <div className="d-flex justify-content-center " style={{marginTop:"70px"}}>
            <div className="col-md-5">
            <div className="card">
            <div className="card-header">
                <h1>Giriş Yap</h1>
            </div>
            <div className="card-body">
               <form onSubmit={login}> 
                <div className="form-group">
                <label  htmlFor="email">E-Mail Adresi</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" type="email" id="email" name="email"></input>
                </div>
                <div className="form-group mt-2">
                <label htmlFor="password">Şifre Giriniz</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" type="password" id="password" name="password"></input>
                </div>
                <div className="form-group mt-2">
                <button className="btn btn-outline-primary w-100">Giriş Yap</button>
                    <Link to="/register" className="mt-2" style={{float:"right"}} >Hesabınız Yokmu </Link>
                </div>
                </form>
            </div>

                
            </div>
            </div>
            </div>

        </>
    )
}

export default LoginComponent; 