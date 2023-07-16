"use client";
import {useAuthContext } from 'apps/web/context/AuthContext';
import signOutFunction from 'apps/web/firebase/auth/signout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import Modal from 'react-modal';


import Feed from '../../components/Feed';
import TemperatureSwitch from '../../components/TemperatureSwitch';

export default function Main() {
  const authContext = useAuthContext();
  const user = authContext?.user

  const router = useRouter()

  // useEffect(() => {
  //   if (user == null) return router.push("/");
  // }, [user])

  const [states, setStates] = useState([
    { state: 'Adrar', number: 1 },
    { state: 'Chlef', number: 2 },
    { state: 'Laghouat', number: 3 },
    { state: 'Oum El Bouaghi', number: 4 },
    { state: 'Batna', number: 5 },
    { state: 'Béjaïa', number: 6 },
    { state: 'Biskra', number: 7 },
    { state: 'Béchar', number: 8 },
    { state: 'Blida', number: 9 },
    { state: 'Bouira', number: 10 },
    { state: 'Tamanrasset', number: 11 },
    { state: 'Tébessa', number: 12 },
    { state: 'Tlemcen', number: 13 },
    { state: 'Tiaret', number: 14 },
    { state: 'Tizi Ouzou', number: 15 },
    { state: 'Alger', number: 16 },
    { state: 'Djelfa', number: 17 },
    { state: 'Jijel', number: 18 },
    { state: 'Sétif', number: 19 },
    { state: 'Saïda', number: 20 },
    { state: 'Skikda', number: 21 },
    { state: 'Sidi Bel Abbès', number: 22 },
    { state: 'Annaba', number: 23 },
    { state: 'Guelma', number: 24 },
    { state: 'Constantine', number: 25 },
    { state: 'Médéa', number: 26 },
    { state: 'Mostaganem', number: 27 },
    { state: 'M\'Sila', number: 28 },
    { state: 'Mascara', number: 29 },
    { state: 'Ouargla', number: 30 },
    { state: 'Oran', number: 31 },
    { state: 'El Bayadh', number: 32 },
    { state: 'Illizi', number: 33 },
    { state: 'Bordj Bou Arréridj', number: 34 },
    { state: 'Boumerdès', number: 35 },
    { state: 'El Tarf', number: 36 },
    { state: 'Tindouf', number: 37 },
    { state: 'Tissemsilt', number: 38 },
    { state: 'El Oued', number: 39 },
    { state: 'Khenchela', number: 40 },
    { state: 'Souk Ahras', number: 41 },
    { state: 'Tipasa', number: 42 },
    { state: 'Mila', number: 43 },
    { state: 'Aïn Defla', number: 44 },
    { state: 'Naâma', number: 45 },
    { state: 'Aïn Témouchent', number: 46 },
    { state: 'Ghardaïa', number: 47 },
    { state: 'Relizane', number: 48 }
  ]);

  const logout = async () => {
    const { result, error } = await signOutFunction();

    if (error) {
      return console.log("Not Logout" + error)
    }
    console.log("Logout" + result)
  };

  const fetchBtn = async () => {
    try {
      const token = await user!.getIdToken();
      console.log('Token' + token);
      const res = await fetch('http://localhost:5000', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!res.ok) {
        console.log('Failed to fetch data');
      }
  
      console.log("WEEEEEE SAL3A" + user?.getIdToken());
    } catch (error) {
      console.log('Error during fetch:', error);
    }
  };

  // popup modal
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "50vw",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <main className="bg-[#3A3A3A] h-screen w-full">
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=' flex flex-wrap gap-2'>
          {states.map((element)=>{
            return (
              <button
                className='text-white bg-[#3A3A3A] p-1 px-3 rounded'
                key={element.number}
                >
                  {element.number} {element.state}
                </button>
            );
          })}
        </div>
      </Modal>
      <Image
        src="/logout.svg"
        alt="logo"
        width={27}
        height={27}
        className=' absolute top-10 right-10 bg-[#C4FCB7] p-1 rounded'
      />
      <section className='p-8 flex flex-col gap-y-2'>
        <p className='text-3xl font-bold'>Weather</p>
        <div onClick={openModal} className=' flex gap-3 bg-[#C4FCB7] rounded p-1 cursor-pointer w-fit'>
          <p className=' text-black'>Select your city</p>
          <Image
            src="/plus.svg"
            width={25}
            height={25}
            alt="btn"
          />
        </div>
        <TemperatureSwitch />
      </section>
      <section className='p-8 flex flex-col gap-y-2'>
        <Feed />
      </section>

    </main>
  )
}

// flex min-h-screen flex-col items-center justify-between p-24 bg-[#3A3A3A]
// <button type="button" onClick={logout} className='rounded bg-[#C4FCB7] p-2 text-black'>Logout</button>




