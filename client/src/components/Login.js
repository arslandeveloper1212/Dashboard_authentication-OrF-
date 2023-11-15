import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {

  const history = useNavigate();

  const [changestate, setChangeState] = useState(false);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setState({ ...state, [name]: value });
  }



  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("done");
    const { email, password } = state;
    const result = await fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })

    });

    const datahit = await result.json();
   if(datahit.status === 201){
   
    localStorage.setItem("usersdatatoken", datahit.result.token)
    history("/dashboard")
    setState({...state, email: "", password: ""});
   }
    

  }




return (
  <div>
    <div className='handle_form d-flex flex-column p-3'>
      <div className='handle_content p-3  text-center'>
        <h2>Welcome Back, Log In</h2>
        <p>Hi, we are you glad you are back. Please login</p>
      </div>

      <form method='POST' onSubmit={HandleSubmit}>
        <div className='col-12 col-lg-10 m-auto'>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>

            <input type="text" className="form-control" name='email' value={changestate.email} onChange={HandleChange} />

          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>

            <div className='button_input_here'>
              <input type={!changestate ? "password" : "text"} className="form-control" name='password' value={changestate.password} onChange={HandleChange} />
              <button className='btn btn-secondary' onClick={() => setChangeState(!changestate)}>{!changestate ? "Show" : "Hide"}</button>
            </div>
          </div>
          <div className="mb-3 mt-4">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
         <div className='text-center text-secondary'>
          <p>Don't have an account<Link to="/register"> Sign Up </Link></p>
          </div>
          </div>
      </form>

    </div>
  </div>
)
}

export default Login
