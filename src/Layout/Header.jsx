import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='container'>
      <Link to="/">Home Page</Link>
      <Link to="/login">login Page</Link>
    </div>
  )
}

export default Header
