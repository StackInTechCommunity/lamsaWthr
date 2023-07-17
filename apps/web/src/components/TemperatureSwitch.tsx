import { useState } from "react";

const TemperatureSwitch = () => {

    const [isCelsius, setIsCelsius] = useState(true);

    const handleSwitch = () => {
        setIsCelsius(!isCelsius);
    };


    return (
        <div className="flex items-center">
            <span className={`${isCelsius ? 'mr-2' : 'mr-2'}   text-white`}>{isCelsius ? 'C°' : 'F°'}</span>
            <label htmlFor="toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        id="toggle"
                        className="sr-only"
                        checked={isCelsius}
                        onChange={handleSwitch}
                    />
                    <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform duration-300 ${isCelsius ? 'translate-x-0' : 'translate-x-4'}`}></div>
                </div>
            </label>
        </div>
    )
}

export default TemperatureSwitch