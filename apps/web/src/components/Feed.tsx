"use client"

import { useState } from "react";
import WeatherBar from "./WeatherBar";

const Feed = () => {

  const [data, setData] = useState([
    {id: 1, cityName: "Tlemcen", temp: 30},
    {id: 2, cityName: "Oran", temp: 29},
    {id: 3, cityName: "Tiaret", temp: 40},
  ]);

  return (
    <div>
        {data.map((elements)=>{
          return (
            <WeatherBar
              key={elements.id}
              data={elements}
            />
          );
        })}
    </div>
  )
}

export default Feed