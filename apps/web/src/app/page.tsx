"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from 'apps/web/context/AuthContext';

export default function Home() {

  const router = useRouter();
  const authContext = useAuthContext();
  const  user = authContext?.user

  useEffect(() => {
    if (user == null) return router.push("/login");
    else if(user != null) return router.push("/main");
  }, [user])

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[#3A3A3A]">
      <p className=' text-white text-2xl'>Welcome To Weathero</p>
    </main>
  )
}


