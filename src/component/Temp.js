import React, { useEffect, useState } from "react";
import Weathercard from "./Weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("paris");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=6c6a1067c7ae0b0972454edfd0cfc174`;
      const res = await fetch(url);
      const data = await res.json();
      const { temp, humidity, pressure, visibility } = data.main;
      const { main: weatherCondition } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        visibility,
        weatherCondition,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
      console.log();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="searchButton" onClick={getWeatherInfo}>
            search
          </button>
        </div>
      </div>
      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
