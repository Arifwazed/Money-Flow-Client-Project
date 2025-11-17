import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext';

const Register = () => {
    const {setUser,createUser,signInGoogle} =use(AuthContext);
    const [error,setError] = useState('');
    const navigate = useNavigate();
    


    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const minLength = /^.{6,}$/;
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,photo,email,password);
        if(!uppercase.test(password)){
            // setError('Must contain an uppercase letter')
            toast.error('Must contain an uppercase letter')
        }
        else if(!lowercase.test(password)){
            // setError('Must contain a lowercase letter')
            toast.error('Must contain a lowercase letter')
        }
        else if(!minLength.test(password)){
            // setError('Must be at least 6 characters long')
            toast.error('Must be at least 6 characters long')
        }
        else{
            createUser(email,password)
            .then(result => {
                setUser(result.user)
                toast.success('SuccessFully Registered')
                setTimeout(()=>{
                    // updateUserProfile(name,photo)
                    navigate('/')
                },1000);
            })
            .catch(error => {
                const code= error.code;
                // console.log(code)
                if(code === 'auth/email-already-in-use'){
                    toast.error('Email already in use')
                }else{
                    toast.error(code)
                }
            }) 
        }

    }

    const handleGoogleSubmit = () => {
        signInGoogle()
        .then(result => {
            const newUser = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            }
            fetch('https://money-flow-server-api.vercel.app/users',{
                method: "POST",
                headers:  {'content-type' : 'application/json'},
                body: JSON.stringify(newUser)
            })
            navigate('/')
            console.log(result.user)
        })
        .catch(error => {
            console.log(error.code)
        })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-linear-to-br from-[#f1f9ff] to-[#a7d7fc]">
                <div className="card bg-[#a7d7fc] w-full max-w-sm shrink-0 shadow-2xl px-2">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center text-primary-gradient">Register Your Account</h1>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* Name */}
                                <label className="label text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    className="input w-full bg-white/50 border-white/20 text-gray-700 rounded-xl"
                                    placeholder="Enter your name"
                                    name="name"
                                    required
                                />
                                {/* Photo */}
                                <label className="label text-gray-700">Photo URL</label>
                                <input
                                    type="text"
                                    className="input w-full bg-white/50 border-white/20 text-gray-700 rounded-xl"
                                    placeholder="Enter Photo URL"
                                    name="photo"
                                    required
                                />
                                {/* Email */}
                                <label className="label text-gray-700">Email</label>
                                <input 
                                    type="email" 
                                    className="input w-full bg-white/50 border-white/20 text-gray-700 rounded-xl" 
                                    placeholder="Email" 
                                    name="email" 
                                    required
                                />
                                {/* Password */}
                                <label className="label text-gray-700">Password</label>
                                <input 
                                    type="password" 
                                    className="input w-full bg-white/50 border-white/20 text-gray-700 rounded-xl" 
                                    placeholder="Password" 
                                    name="password" 
                                    required
                                />
                                {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                                <button className="btn btn-register border-none shadow-none text-white mt-4 rounded-xl">Register</button>
                                <div className='flex justify-center items-center gap-3 text-gray-500 my-2'>
                                    <hr className='w-1/2'/>
                                    <p>OR</p>
                                    <hr className='w-1/2'/>
                                </div>
                                {/* Google */}
                                <button onClick={handleGoogleSubmit} className="btn bg-gray-800  border-none shadow-none text-white rounded-xl">
                                <img width="18" height="18" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                                Login with Google
                                </button>
                                <p className="text-center my-3 text-xs font-semibold dark:text-black">
                                    Already have an Account ?{" "}
                                    <Link to="/login" className="text-secondary">
                                    Login
                                    </Link>{" "}
                                </p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;