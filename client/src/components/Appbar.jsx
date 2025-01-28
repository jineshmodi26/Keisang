import React from 'react'
import logo from "../assets/logo.png"
import support from "../assets/Support.png"

const Appbar = () => {
  return (
    <div className='main-header'>
        <div className='logo-div'>
            <img src={logo}/>
            <p className='logo-title'>Admin Console</p>
            <p className='logo-badge'>Admin View</p>
        </div>
        <div className='profile-div'>
            <img src={support}/>
            <p className='support'>Support</p>
            <p className='account-name'>Jane</p>
        </div>
    </div>
  )
}

export default Appbar