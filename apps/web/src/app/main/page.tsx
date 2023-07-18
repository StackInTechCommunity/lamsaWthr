"use client";
import { useAuthContext } from 'apps/web/context/AuthContext';
import signOutFunction from 'apps/web/firebase/auth/signout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Feed from '../../components/Feed';
import TemperatureSwitch from '../../components/TemperatureSwitch';
import useFetch from '../../customHook/useFetch';
import { User } from '../../types/User';
import { changeUserCity } from '../api/ChangeCity';
import { customStyles } from '../styles/style';
import { fetchUser } from '../api/FetchUser';
import { localCities, states } from '../data/localData';
import { addUserCity } from '../api/AddCity';
import Modal from '../../components/CityDialog';

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
        onClose={closeModal}
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



