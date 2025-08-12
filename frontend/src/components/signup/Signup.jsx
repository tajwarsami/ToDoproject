import React, { useState } from 'react';
import "./signup.css";
import HeadingComp from './HeadingComp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async(e) => {
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/v1/register`, Inputs).then((response) => {
      if(response.data.message==="User Already Exists"){
        alert(response.data.message);
      }
      else{
        alert(response.data.message);
    setInputs({ 
      email: "", 
      username: "", 
      password: "" 
    });
        history("/signin");
      }
  });
};

  return (
    <div className='signup'>
      <div className='container'>
        <div className="row">
          <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
            <form 
              className="d-flex flex-column p-5 w-100" 
              onSubmit={submit}
            >
              <input 
                type="email" 
                className='p-2 my-3 input-signup' 
                name="email"
                placeholder='Enter your Email'
                onChange={change}
                value={Inputs.email}
              /> 
              <input 
                type="text" 
                className='p-2 my-3 input-signup' 
                name="username"
                placeholder='Enter your Username'
                onChange={change}
                value={Inputs.username}
              />
              <input 
                type="password" 
                className='p-2 my-3 input-signup' 
                name="password"
                placeholder='Enter your Password'
                onChange={change}
                value={Inputs.password}
              />
              <button 
                type="submit" 
                className='btn-signup p-2'
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
            <HeadingComp first="Sign" second="Up"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
