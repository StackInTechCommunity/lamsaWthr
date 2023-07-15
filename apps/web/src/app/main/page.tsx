"use client";

import { AuthContextProps, useAuthContext } from 'apps/web/context/AuthContext';
import signOutFunction from 'apps/web/firebase/auth/signout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Main() {
  const authContext = useAuthContext();
  const  user = authContext?.user

  const router = useRouter()

  useEffect(() => {
    if (user == null) return router.push("/");
  }, [user])


  const logout = async () => {
    const { result, error } = await signOutFunction();

    if (error) {
      return console.log("Not Logout" + error)
    }
    console.log("Logout" + result)
    return router.push("/")
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#3A3A3A]">
      <p className=' text-white text-2xl'>Weathero</p>
      <p className=' text-white text-2xl'>Only logged in users can view this page hello {user?.email}</p>
      <button type="button" onClick={logout} className='rounded bg-[#C4FCB7] p-2 text-black'>Logout</button>
    </main>
  )
}




