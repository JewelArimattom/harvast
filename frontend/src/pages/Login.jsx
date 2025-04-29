import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return false;
    }
    return true;
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/forgot-password', { 
        email: resetEmail 
      });
      
      if (response.data.success) {
        toast.success("Password reset link sent to your email");
        setShowForgotPassword(false);
      } else {
        toast.error("Failed to send reset link");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending reset link");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign up") {
        if (!passwordValidation(password)) return;
        
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password});
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Registration failed");
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {email, password});
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error(error);
      if (currentState === "Sign up") {
        toast.error(error.response?.data?.message || "Registration error");
      } else {
        toast.error(error.response?.data?.message || "Login error");
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token])

  return (
    <>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-600'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular font-bold text-3xl'>{currentState}</p>
          <hr className='border-none w-8 h-[1.5px] bg-black'/>
        </div>
        {currentState === "Login" ? '' : 
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            type="text" 
            className='w-full border border-gray-400 px-3 py-2' 
            placeholder='Name' 
            required
          />
        }
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          type="email" 
          className='w-full border border-gray-400 px-3 py-2' 
          placeholder='Email' 
          required
        />
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          type="password" 
          className='w-full border border-gray-400 px-3 py-2' 
          placeholder='Password' 
          required
        />
        <div className='flex justify-between w-full text-sm mt-[-8px]'>
          <p 
            className='cursor-pointer hover:underline' 
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Password ?
          </p>
          {currentState === "Login" 
            ? <p onClick={() => setCurrentState("Sign up")} className='cursor-pointer'>Create Account</p>
            : <p onClick={() => setCurrentState("Login")} className='cursor-pointer'>Login Here</p>
          }
        </div>
        <button type='submit' className='w-full bg-black text-white px-3 py-2'>
          {currentState}
        </button>
      </form>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Reset Password</h3>
              <button 
                onClick={() => setShowForgotPassword(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="mb-4">Enter your email to receive a password reset link</p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full border border-gray-400 px-3 py-2 mb-4 rounded"
              required
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowForgotPassword(false)}
                className="px-4 py-2 border border-gray-400 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleForgotPassword}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Login