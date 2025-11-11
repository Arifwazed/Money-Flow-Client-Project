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
            setError('Must contain an uppercase letter')
            toast.error(error)
        }
        else if(!lowercase.test(password)){
            setError('Must contain a lowercase letter')
            toast.error(error)
        }
        else if(!minLength.test(password)){
            setError('Must be at least 6 characters long')
            toast.error(error)
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
                toast.error(code)
            }) 
        }

    }

    const handleGoogleSubmit = () => {
        signInGoogle()
        .then(result => {
            navigate('/')
            console.log(result.user)
        })
        .catch(error => {
            console.log(error.code)
        })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5]">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center">Register Your Account</h1>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* Name */}
                                <label className="label">Your Name</label>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Enter your name"
                                    name="name"
                                    required
                                />
                                {/* Photo */}
                                <label className="label">Photo URL</label>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Enter Photo URL"
                                    name="photo"
                                    required
                                />
                                {/* Email */}
                                <label className="label">Email</label>
                                <input 
                                    type="email" 
                                    className="input w-full" 
                                    placeholder="Email" 
                                    name="email" 
                                    required
                                />
                                {/* Password */}
                                <label className="label">Password</label>
                                <input 
                                    type="password" 
                                    className="input w-full" 
                                    placeholder="Password" 
                                    name="password" 
                                    required
                                />
                                {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                                <button className="btn btn-primary-custom mt-4">Register</button>
                                <div className='flex justify-center items-center gap-3 text-gray-500 my-2'>
                                    <hr className='w-1/2'/>
                                    <p>OR</p>
                                    <hr className='w-1/2'/>
                                </div>
                                {/* Google */}
                                <button onClick={handleGoogleSubmit} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                                </button>
                                <p className="text-center my-3 text-xs font-semibold">
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