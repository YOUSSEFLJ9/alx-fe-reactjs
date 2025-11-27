import React from 'react'
import {Link} from 'react-router-dom'

function  Navbar() {
  return (
    <nav style={{backgroundColor:'#000875', font:'revert', color:'white',gap:'1rem' , display:'flex', justifyContent:'flex-start', padding: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
    </nav>
  )
}

export default  Navbar