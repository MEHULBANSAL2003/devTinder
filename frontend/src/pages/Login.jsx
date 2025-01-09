import React, { useState } from "react";
import { validateLoginData } from "../utils/validation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError]=useState(null);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLoginClick=async()=>{
    
    const message=validateLoginData(emailId,password);
    setError(message);
       
    if(message==null){
        
      const url= `${import.meta.env.VITE_BACKEND_URL}/login`;
      try{
      const response=await axios({
        method:"post",
        url:url,
        data:{
          emailId:emailId,
          password:password
        },
        withCredentials:true 

      })
     dispatch(addUser(response.data.data));
     navigate("/");
    }
    catch(err){
      console.log(err.response.data.message);
      setEmailId("");
      setPassword("");
    }
    }

    
  }

  return (
    <div className="flex justify-center my-8">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center font-bold">
            Login
          </h2>

          <div>
            <label className="form-control w-full max-w-xs mb-5">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                placeholder="enter your email"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <div className="text-red-600 mt-1">{error&& error.startsWith("Email")&& (<p>{error}</p>)}</div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="enter your password"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
               <div className="text-red-600 mt-1">{error&& error.startsWith("Password")&& (<p>{error}</p>)}</div>
            </label>
          </div>
          <div className="card-actions justify-center mt-10">
            <button className="btn btn-primary" onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
