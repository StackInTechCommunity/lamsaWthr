"use client";

import signIn from 'apps/web/firebase/auth/signin';
import signUp from 'apps/web/firebase/auth/signup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();


  
  const handleUsernameChange = (event : any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (event :any) => {
    event.preventDefault()
   
    try {

      if(username.length === 0){
        setError("Username empty")
        return 
      }
      if(password.length === 0){
        setError("Password empty")
        return 
      }
      setIsLoading(true)

      const { result, error } = await signUp(username, password);
      
     
      if (error) {
        setIsLoading(false)
        setError(String(error))
        return console.log(error)
      }
    
      const response = await fetch("http://localhost:5000/api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${result?.user.getIdToken()}`
        },
        body: JSON.stringify({username : username ,password : password , id : result?.user.uid }),
      });
  
      if (!response.ok) {
        setError('Error submitting the request, try again')
      }
      setIsLoading(false)
      return router.push("/main")
  
    } catch (error) {
      setIsLoading(false)
      setError(String(error))
      console.error('Error:', error);
    }
  };

 
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24 bg-[#3A3A3A]">
        <p className=' text-white text-2xl'>Weathero</p>
        <div className=' h-80 w-80 bg-[#818080] rounded '>
        <form className=' flex flex-col justify-evenly h-full p-3  '>

          <h1 className='text-center text-white'>Register</h1>
          <input type="text" placeholder='Username'  value={username} onChange={handleUsernameChange}  className='p-2 rounded bg-[#D9D9D9]'/>
          
          <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange}  className='p-2 rounded bg-[#D9D9D9]'/>

          <button type="button"  onClick={handleSignup} className='rounded bg-[#C4FCB7] p-2 text-black'>{isLoading ? "Loading ..." : "sign up"}</button>

          
          <Link href="/"><p className=' text-center text-white cursor-pointer'  >Already have account?</p></Link>
        </form>
        
        </div>
        {error && <p className=' text-center text-red-500 cursor-pointer '  >{error}</p>
          }
    </main>
  )
}


