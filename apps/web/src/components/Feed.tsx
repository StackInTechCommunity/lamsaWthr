"use client"

import { useState } from "react";
import WeatherBar from "./WeatherBar";
import { useAuthContext } from "apps/web/context/AuthContext";
import useFetch from "../customHook/useFetch";

const Feed = () => {
  const authContext = useAuthContext();
  const user = authContext?.user
  const { data , isPending, error } = useFetch(`http://localhost:5000/api/weather/${user?.uid}`);

  
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>

        {data.cities.map((element)=>{

         
          return (
            
            <WeatherBar
              key={element.id}
              name={element.name}
              
              temp={ data.settings.preferredUnit === "celsius" ?  element.weather.temperatureC.toFixed(2) :element.weather.temperatureF.toFixed(2) }
            />
          );


        })}
    </div>
  )
}

export default Feed