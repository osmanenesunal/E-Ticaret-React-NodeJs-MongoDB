import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

function RegisterComponent(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [name , setName] = useState("")
   
    const register = async (e) =>{
        e.preventDefault()
      let model = {email:email , name: name , password:password}
        try {
           const response=await axios.post("http://localhost:5000/auth/register",model)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("name", JSON.stringify(response.data.user))
           navigate("/")
        } catch (error) {
            console.error(error)
        }
    }



    return(
        <>
        <div className="d-flex justify-content-center " style={{marginTop:"70px"}}>
        <div className="col-md-5">
        <div className="card">
        <div className="card-header">
            <h1>Kayıt Ol</h1>
        </div>
        <div className="card-body">
           <form onSubmit={register}>
           <div className="form-group">
                <label  htmlFor="email">E-Mail Adresi</label>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" type="email" id="email" name="email"></input>
                </div>
            <div className="form-group mt-2">
                <label htmlFor="name">Kullanıcı Adı</label>
                <input value={name} onChange={(e) =>{setName(e.target.value)}} type="text" id="text" name="text" className="form-control"></input>
            </div>

            <div className="form-group mt-2">
                <label htmlFor="password" >Şifre </label>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control" type="password" id="password" name="password"></input>
            </div>
            <div className="form-group mt-2">
                <button className="btn btn-outline-success w-100" > Kayıt Ol</button>
                <Link to="/login" className="mt-2" style={{float:"right"}}>Hesabım Var</Link>
            </div>

            </form> 

        </div>



        </div>


        </div>

            
        </div>
        </>
    )
}

export default RegisterComponent; 
