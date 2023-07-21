import React, { useState } from 'react'
import logo from '../assests/logo.png'
import { Link } from 'react-router-dom'
import {FaUserAlt} from 'react-icons/fa'
const Header = () => {
    const [showMenu,setShowMenu] = useState(false);
    const handleShowMenu = () => {
        setShowMenu(preve => !preve)
    }
    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
            {/* desktop */}
            <div className='flex items-center h-full justify-between'>
                <Link to={""}>
                    <div className='h-12'>
                        <img src={logo} className='h-full'/>
                    </div>
                </Link>
            <div className='flex items-center gap-4 md:gap-7'>
                <nav className='flex gap-4 md:gap-6'>
                    <Link to = {""}>Home</Link>
                    <Link to = {"menu"}>Menu</Link>
                    <Link to = {"about"}>About</Link>
                    <Link to = {"contact"}>Contact</Link>
                </nav>
                <div className=''onClick={handleShowMenu}>
                    <div className='cursor-pointer'>
                        <FaUserAlt/>
                    </div> 
                    {showMenu && (
                        <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                            <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer'>New Product</Link>
                            <Link to={"userlogin"} className='whitespace-nowrap cursor-pointer'>Login</Link>
                        </div> 
                    )}  
                    
                </div>
            </div>
        </div>  
    </header>
  )
}

export default Header
