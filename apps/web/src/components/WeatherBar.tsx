import { useState } from "react"

type props = {name : string , temp : string , onClick}
const WeatherBar = ({name , temp ,onClick} : props ) => {


    return (
        <div className="bg-[#D9D9D9] flex justify-between text-center items-center p-3 rounded my-2">
            <h1 className="text-black font-bold text-xl">
                {name}
            </h1>
            <div className="flex gap-x-2 items-center">
                <p className="text-black text-3xl">{temp}°</p>
             
                <button
                    className="bg-[#C4FCB7] p-1 px-5 rounded cursor-pointer text-black"
                    onClick={onClick}
                >
                    Change city
                </button>
            </div>
        </div>
    )
}

export default WeatherBar