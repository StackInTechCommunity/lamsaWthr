"use client";
import { useAuthContext } from 'apps/web/context/AuthContext';
import signOutFunction from 'apps/web/firebase/auth/signout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import Modal from 'react-modal';


import Feed from '../../components/Feed';
import TemperatureSwitch from '../../components/TemperatureSwitch';
import useFetch from '../../customHook/useFetch';
import { User } from '../../types/User';
import { changeUserCity } from '../api/ChangeCity';
import { customStyles } from '../styles/style';
import { fetchUser } from '../api/FetchUser';
import { localCities } from '../data/localData';
import { addUserCity } from '../api/AddCity';

export default function Main() {
  const authContext = useAuthContext();
  const user = authContext?.user
  const router = useRouter()
  const [userWithlist, setUserWithlist] = useState<User>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isCelsius, setIsCelsius] = useState(false);
  const [cityId, setCityId] = useState("");

  
  useEffect(() => {
    if (user == null) return router.push("/");
  }, [user])

  useEffect(() => {
    const getList = async () => {
      try {
        const fetchedList = await fetchUser(user!.uid);
        setUserWithlist(fetchedList);
      } catch (error) {
        console.error(error);
      }
    };
    getList();
  }, []);

  const [states, setStates] = useState([
    { state: 'Adrar', number: 1, latitude: 27.8767, longitude: -0.2833 },
    { state: 'Chlef', number: 2, latitude: 36.1656, longitude: 1.3345 },
    { state: 'Laghouat', number: 3, latitude: 33.8058, longitude: 2.8833 },
    { state: 'Oum El Bouaghi', number: 4, latitude: 35.8792, longitude: 7.1136 },
    { state: 'Batna', number: 5, latitude: 35.5559, longitude: 6.1744 },
    { state: 'Béjaïa', number: 6, latitude: 36.7489, longitude: 5.0558 },
    { state: 'Biskra', number: 7, latitude: 34.8591, longitude: 5.7278 },
    { state: 'Béchar', number: 8, latitude: 31.6111, longitude: -2.2289 },
    { state: 'Blida', number: 9, latitude: 36.4667, longitude: 2.8333 },
    { state: 'Bouira', number: 10, latitude: 36.3808, longitude: 3.8964 },
    { state: 'Tamanrasset', number: 11, latitude: 22.7850, longitude: 5.5228 },
    { state: 'Tébessa', number: 12, latitude: 35.4072, longitude: 8.1200 },
    { state: 'Tlemcen', number: 13, latitude: 34.8783, longitude: -1.3167 },
    { state: 'Tiaret', number: 14, latitude: 35.3781, longitude: 1.3158 },
    { state: 'Tizi Ouzou', number: 15, latitude: 36.7163, longitude: 4.0497 },
    { state: 'Alger', number: 16, latitude: 36.7538, longitude: 3.0588 },
    { state: 'Djelfa', number: 17, latitude: 34.6741, longitude: 3.2506 },
    { state: 'Jijel', number: 18, latitude: 36.8089, longitude: 5.7669 },
    { state: 'Sétif', number: 19, latitude: 36.1914, longitude: 5.4137 },
    { state: 'Saïda', number: 20, latitude: 34.8408, longitude: 0.1517 },
    { state: 'Skikda', number: 21, latitude: 36.8733, longitude: 6.9094 },
    { state: 'Sidi Bel Abbès', number: 22, latitude: 35.1924, longitude: -0.6293 },
    { state: 'Annaba', number: 23, latitude: 36.9000, longitude: 7.7566 },
    { state: 'Guelma', number: 24, latitude: 36.4661, longitude: 7.4286 },
    { state: 'Constantine', number: 25, latitude: 36.3650, longitude: 6.6147 },
    { state: 'Médéa', number: 26, latitude: 36.2642, longitude: 2.7536 },
    { state: 'Mostaganem', number: 27, latitude: 35.9372, longitude: 0.0931 },
    { state: 'M\'Sila', number: 28, latitude: 35.7058, longitude: 4.5422 },
    { state: 'Mascara', number: 29, latitude: 35.3972, longitude: 0.1408 },
    { state: 'Ouargla', number: 30, latitude: 31.9496, longitude: 5.3250 },
    { state: 'Oran', number: 31, latitude: 35.6970, longitude: -0.6359 },
    { state: 'El Bayadh', number: 32, latitude: 33.6841, longitude: 1.0122 },
    { state: 'Illizi', number: 33, latitude: 26.4803, longitude: 8.4485 },
    { state: 'Bordj Bou Arréridj', number: 34, latitude: 36.0736, longitude: 4.7573 },
    { state: 'Boumerdès', number: 35, latitude: 36.7661, longitude: 3.4778 },
    { state: 'El Tarf', number: 36, latitude: 36.7667, longitude: 8.3133 },
    { state: 'Tindouf', number: 37, latitude: 27.6742, longitude: -8.1472 },
    { state: 'Tissemsilt', number: 38, latitude: 35.6072, longitude: 1.8114 },
    { state: 'El Oued', number: 39, latitude: 33.3600, longitude: 6.8630 },
    { state: 'Khenchela', number: 40, latitude: 35.4311, longitude: 7.1436 },
    { state: 'Souk Ahras', number: 41, latitude: 36.2833, longitude: 7.9500 },
    { state: 'Tipasa', number: 42, latitude: 36.5886, longitude: 2.4489 },
    { state: 'Mila', number: 43, latitude: 36.4508, longitude: 6.2644 },
    { state: 'Aïn Defla', number: 44, latitude: 36.2641, longitude: 1.9631 },
    { state: 'Naâma', number: 45, latitude: 32.9250, longitude: -0.5989 },
    { state: 'Aïn Témouchent', number: 46, latitude: 35.3039, longitude: -1.1417 },
    { state: 'Ghardaïa', number: 47, latitude: 32.4890, longitude: 3.6788 },
    { state: 'Relizane', number: 48, latitude: 35.7361, longitude: 0.5558 },
  ]);


  const logout = async () => {
    const { result, error } = await signOutFunction();

    if (error) {
      return console.log("Not Logout" + error)
    }
    console.log("Logout" + result)
  };

  const addCity = async (name: string, longitude: string, latitude: string) => {
    const token = await user!.getIdToken()
    const fetchedList = await addUserCity({ userId: user!.uid, token: token, name: name, latitude: latitude, longitude: longitude });
    setUserWithlist(fetchedList);
  };

  const changeCity = async (name: string, longitude: string, latitude: string) => {
    const token = await user!.getIdToken()
    const fetchedList = await changeUserCity({ userId: user!.uid, cityId: cityId, token: token, name: name, latitude: latitude, longitude: longitude });
    setUserWithlist(fetchedList);
  };

  const clickChanageCity = (data) => {
    console.log('Data received from child:', data);
    setCityId(data); 
    openModal(false)
  };

  const handleSwitch = (data) => {
    console.log('Data received from child:', data);
    setIsCelsius(data);
  }
  function openModal(isCreated : boolean) {
    setIsCreated(isCreated)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function SelectCity(city : localCities){
    if(isCreated){
      addCity(city.state, String(city.longitude), String(city.latitude))
    }else {
      changeCity(city.state, String(city.longitude), String(city.latitude))
    }
    closeModal()
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

          {states.map((element) => {
           
            return (
              <button
                onClick={() => SelectCity(element)}
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
        onClick={logout}
        width={27}
        height={27}
        className=' absolute top-10 right-10 bg-[#C4FCB7] p-1 rounded'
      />
      <section className='p-8 flex flex-col gap-y-2'>
        <p className='text-3xl font-bold  text-white'>Weather</p>
        <p className=' text-sm font-bold  text-white'>{user?.email}</p>
        <div onClick={ ()=> openModal(true)} className=' flex gap-3 bg-[#C4FCB7] rounded p-1 cursor-pointer w-fit'>
          <p className=' text-black'>Select your city</p>
          <Image
            src="/plus.svg"
            width={25}
            height={25}
            alt="btn"
          />
        </div>
        <TemperatureSwitch sendSwitchDataToParent={handleSwitch} />
      </section>
      <section className='p-8 flex flex-col gap-y-2'>
        <Feed userWithlist={userWithlist} sendDataToParent={clickChanageCity} isCelsius={isCelsius} />
      </section>

    </main>
  )
}



