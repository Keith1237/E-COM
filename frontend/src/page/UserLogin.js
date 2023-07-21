import React, { useState } from "react";
import imageForSignup from "../assests/user.png";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const UserLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {  email, password } = data;
    if (email && password ) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const datares = await fetchData.json();
      // console.log(datares);
      toast(datares.message);
      if(datares.alert){
        
        navigate("/")
      }
    }else{
        alert("Enter all details");
    }
  };
  return (
    <div className="p3 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex items-center flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign Up</h1> */}
        <div className="w-16">
          <img src={imageForSignup} className="w-full"/>
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          ></input>

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 bg-slate-200  rounded focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            ></input>
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          

          <button className="w-full max-w-[120px] m-auto mt-4 bg-red-400 hover:bg-red-500 cursor-pointer text-xl text-center py-1 rounded-full">
            LOG In
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default UserLogin
