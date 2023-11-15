import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {LoginContext} from './ContextProvider/Context'


const Dashboard = () => {

 const {logindata , setLoginData} = useContext(LoginContext);
  console.log(logindata)

  const history = useNavigate();
  const DashboardValid = async () =>{
    let token = localStorage.getItem("usersdatatoken");
    
    const res = await fetch ("/validuser",{
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    // console.log(data);
    if(data.status == 401 || !data){
      // console.log("error page redirect");
      history("*")
    }else{
      console.log("user verify");
      setLoginData(data);
      history("/dashboard")
    }
  }

  useEffect(()=>{
    DashboardValid();
  },[])

  return (
    <div>
      <div className='container'>
      <div className='row'>
      <div className='d-flex  flex-column m-auto justify-content-center align-items-center'>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa69_HGc_i3MXKCPZzCfAjBZC4bXJsn0rS0Ufe6H-ctZz5FbIVaPkd1jCPTpKwPruIT3Q&usqp=CAU' style={{width: "200px"}} alt=''/>
      <h3>User Email: {logindata? logindata.ValidUserOne.email: ""} </h3>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard
