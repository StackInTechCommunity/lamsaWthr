import { useState } from "react"

const WeatherBar = ({ data }) => {

    // const [isActive, setIsActive] = useState(true);

    // const tempSwitchHandle = () => {
    //     setIsActive((prevState) => !prevState);
    // }

    return (
        <div className="bg-[#D9D9D9] flex justify-between text-center items-center p-3 rounded my-2">
            <h1 className="text-black font-bold text-xl">
                {data.cityName}
            </h1>
            <div className="flex gap-x-2 items-center">
                <p className="text-black text-3xl">{data.temp}°</p>
                {/* <div className="flex gap-x-1">
                    <p className={`text-black text-2xl cursor-pointer ${isActive && "font-bold"}`} onClick={tempSwitchHandle}>°C</p>
                    <p className="text-black">|</p>
                    <p className={`text-black text-2xl cursor-pointer ${!isActive && "font-bold"}`} onClick={tempSwitchHandle}>°F</p>
                </div> */}
                <button
                    className="bg-[#C4FCB7] p-1 px-5 rounded cursor-pointer text-black"
                >
                    Change city
                </button>
            </div>
        </div>
    )
}

export default WeatherBar