import axios from 'axios'
import React , {useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3030/api/auth/register",{name, email, password})

            if(response.data.success){
                navigate('/login')
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
    <div className=' shadow p-6 w-80 bg-white'>
      <h2 className='text-2xl font-bold mb-4'>Signup </h2>
      <form onSubmit={handleSubmit} >
        <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="name">Name</label>
            <input type="text"
             className='w-full px-3 py-2 border-gray-600 border outline-0 rounded-tl-2xl rounded-ee-2xl ' placeholder='Enter name'
             onChange={(e)=>{setName(e.target.value)}}
              required/>
        </div>
         <div className='mb-4'>
            <label className='block text-gray-700'  htmlFor="email">Email</label>
            <input type="email" 
            onChange={(e)=>{setEmail(e.target.value)}}
            className='w-full px-3 border-gray-600 rounded-tl-2xl  rounded-ee-2xl  outline-0 py-2 border' placeholder='Enter eMail' required/>
        </div>
        <div>
            <label className='block text-gray-700' htmlFor="password">Password</label>
            <input type="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            className='w-full px-3  rounded-ee-2xl rounded-tl-2xl py-2 outline-0 border-gray-600 border'  placeholder='********' required/>
        </div>

        <div className="mb-4 mt-4">
            <button type='submit'
            className='w-full bg-teal-600 text-white py-2 rounded-tr-2xl rounded-bl-2xl'>
                Sign Up
            </button>
            <p className='text-center '>
                Already Have Account ? <Link to={'/login'}>Register</Link>
            </p>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Signup
