import React, { useState } from 'react';
import "./signup.css";
import HeadingComp from './HeadingComp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
      email: "",
      password: ""
    });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async(e) => {
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/v1/signin`, Inputs).then((response) => {
      sessionStorage.setItem("id", response.data.others._id);
      dispatch(authActions.login());
      history("/todo");
  });
}

  return (
   <div> 
   <div className='signup'>
    <div className='container'>
      <div className="row">
        <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
          <HeadingComp first = "Sign" second = "In"/>
        </div>
        <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
          <div className="d-flex flex-column p-5 w-100">
           <input type="email" className='p-2 my-3 input-signup' 
           name="email"
           placeholder='Enter your Email'
           value={Inputs.email}
           onChange={change}
           /> 
           <input type="password" className='p-2 my-3 input-signup' 
           name="password"
           placeholder='Enter your Password'
           value={Inputs.password}
           onChange={change}
           />
           <button className='btn-signup p-2' onClick={submit}>
            Sign In
           </button>
          </div>
        </div>
      </div>
      </div>'
  </div>
  </div>
  )
}

export default Signin;
