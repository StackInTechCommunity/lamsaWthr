"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import signIn from 'apps/web/firebase/auth/signin';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  
  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
  
    const { result, error } = await signIn(username, password);
    
    if(error){
      return console.log(error)
    }
    console.log(result?.user.uid)
    try {
      const response = await fetch(`http://localhost:5000/api/user/${result?.user.uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${result?.user.getIdToken()}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Error submitting the request.');
      }
  
      return router.push("/main")
  
    } catch (error) {
      console.error('Error:', error);
    }
   
  };

  const createAccount = () => {
    router.push('/register');
  };

 
  return (
    <main className="flex min-h-screen flex-col items-center  justify-center gap-5 p-24 bg-[#3A3A3A]">
    <p className=' text-white text-2xl'>Weathero</p>
    <div className=' h-80 w-80 bg-[#818080] rounded '>
      <form className=' flex flex-col justify-evenly h-full p-3  '>

        <h1 className='text-center text-white'>Login</h1>
        <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} className='p-2 rounded bg-[#D9D9D9]' />

        <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} className='p-2 rounded bg-[#D9D9D9]' />

        <button type="button" onClick={handleLogin} className='rounded bg-[#C4FCB7] p-2 text-black'>sign in</button>

        <p className=' text-center text-white cursor-pointer' onClick={createAccount} >Create Account</p>
      </form>
    </div>
  </main>
  )
}


