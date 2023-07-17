"use client"

import { useEffect, useState } from "react";
import WeatherBar from "./WeatherBar";
import { useAuthContext } from "apps/web/context/AuthContext";
import useFetch from "../customHook/useFetch";
import Modal from 'react-modal';
import { fetchUser } from "../app/api/FetchUser";
import { City } from "../types/City";
import { states } from "../app/data/localData";
import { User } from "../types/User";
import { changeUserCity } from "../app/api/ChangeCity";

const Feed = ({userWithlist , sendDataToParent ,isCelsius  }) => {
 
  return (

    <div>
  
      {userWithlist?.cities.map((element) => {

        return (

          <WeatherBar
            key={element.id}
            name={element.name}
            onClick={() => {
              sendDataToParent(element.id)
            }}
            temp={isCelsius ? element.weather.temperatureC.toFixed(2) : element.weather.temperatureF.toFixed(2)}
          />
        );


      })}
    </div>
  )
}

export default Feed


