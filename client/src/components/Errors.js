import React from 'react'
import { Link } from 'react-router-dom'

const Errors = () => {
  return (
    <div>
      <div className='container'>
      <div className='row'>
      <div className='text-center'>
      <h1><strong>404</strong> Page Error Found</h1>
      <Link to="/login">Redirect to Login Page</Link>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Errors
