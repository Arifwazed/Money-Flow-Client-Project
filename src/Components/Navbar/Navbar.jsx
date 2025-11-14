import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';

const Navbar = () => {
    const {user,logOut} = use(AuthContext);
    const fallbackImg = "https://img.icons8.com/ios-filled/50/user-male-circle.png";
    const links = <>
        <li><NavLink to="/" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""}>Home</NavLink></li>
        <li><NavLink to="/addTransaction" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""}>Add Transaction</NavLink></li>
        <li><NavLink to="/my-transactions" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""}>My Transactions</NavLink></li>
        <li><NavLink to="/reports" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""}>Reports</NavLink></li>
        <li><NavLink to="/updateProfile" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""}>My Profile</NavLink></li>
    </>
    const handleLogOut = () => {
        logOut()
    }
    return (
        <div className=''>
            <div className="navbar bg-[#2D5DA9] text-white shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                    </div>
                    <a className="flex items-center text-xl font-bold">
                        <img width="40" height="40" src="https://img.icons8.com/fluency/48/notes-and-coins.png" alt="notes-and-coins"/>
                        Money <span className='text-primary-gradient'>Flow</span> </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user? <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className=" m-1">
                                <img width="40" height="40" className="rounded-full" src={user?.photoURL || fallbackImg} alt=""/>
                                </div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-[#2D5DA9] text-white rounded-box z-1 w-48 md:w-54 p-2 shadow-sm border">
                                <li className="text-base font-semibold"><a><img width="28" height="28" src="https://img.icons8.com/pulsar-gradient/48/user.png" alt="user"/>{user.displayName}</a></li>
                                <li><button onClick={handleLogOut} className="btn btn-logout border-none shadow-none btn-logout">LogOut <img width="18" height="18" src="https://img.icons8.com/metro/26/FFFFFF/exit.png" alt="exit"/></button></li>
                            </ul>
                        </div>
                        </>
                        // <div className='flex items-center gap-2'>
                        //     <img src={user?.photoURL || fallbackImg} className='h-9 w-9 rounded-full' alt="" onError={(e)=> {e.target.style.display = 'none'}}/> <button onClick={handleLogOut} className='btn'>Sign Out</button>
                        // </div>
                        : <>
                        <Link to="/login" className='btn btn-login border-none shadow-none'>Login</Link>
                        <Link to="/register" className='btn btn-register border-none shadow-none text-white ml-3'>Sign Up</Link>
                        </> 
                        
                        
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;