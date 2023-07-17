"use client"

import { useState } from "react";
import WeatherBar from "./WeatherBar";
import { useAuthContext } from "apps/web/context/AuthContext";
import useFetch from "../customHook/useFetch";
import Modal from 'react-modal';

const Feed = () => {
  const authContext = useAuthContext();
  const user = authContext?.user
  const { data, isPending, error } = useFetch(`http://localhost:5000/api/weather/${user?.uid}`);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cityId, setCityId] = useState("");
  const [items, setItems] = useState<[]>([]);

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


  const changeCity = async ( name: string, longitude: string, latitude: string) => {

    try {
     
      console.log(name + longitude + latitude +" cityId " + cityId);
      const token = await user!.getIdToken();

      const response = await fetch(`http://localhost:5000/api/weather/${user?.uid}?cityId=${cityId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: name, longitude: longitude, latitude: latitude }),
      });

      if (!response.ok) {
        throw new Error('Error submitting the request.');
      }

      // should add id

    } catch (error) {
      console.error('Error:', error);
    }
    closeModal()
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  
 
 
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
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

 
  return (
    
    <div>
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
              onClick={()=> changeCity(element.state , String(element.longitude) , String(element.latitude) )}
                className='text-white bg-[#3A3A3A] p-1 px-3 rounded'
                key={element.number}
              >
                {element.number} {element.state}
              </button>
            );
          })}
        </div>
      </Modal>
      {data.cities.map((element) => {

        return (

          <WeatherBar
            key={element.id}
            name={element.name}
            onClick={()=> {
              openModal()
              setCityId(element.id)
            }}
            temp={data.settings.preferredUnit === "celsius" ? element.weather.temperatureC.toFixed(2) : element.weather.temperatureF.toFixed(2)}
          />
        );


      })}
    </div>
  )
}

export default Feed