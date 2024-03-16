import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

function SavedCities() {
  const { userid } = useParams();
  const [savedCities, setSavedCities] = useState([]);
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/getloc/${userid}`)
      .then((response) => {
        const cityNames = response.data.map((item) => item.mylocations);
        setSavedCities(cityNames);
      })
      .catch((error) => {
        console.error("Error fetching saved cities:", error);
      });
  }, [userid]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      for (let cityName of savedCities) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3531a36cae131ef86c0fd8127473f1dd`
          );
          const filteredData = response.data.list.filter(
            (item, index) => index % 8 === 0
          );
          newData.push({ cityName, data: filteredData });
        } catch (error) {
          console.error(error);
        }
      }
      setData(newData);
    };

    if (savedCities.length > 0) {
      fetchData();
    }
  }, [savedCities]);

  const kelvinToFahrenheit = (kelvin) => {
    return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(1);
  };

  const formatDate = (date) => {
    const options = { weekday: "long" };
    const today = new Date().toLocaleDateString(undefined, options);

    const formattedDate = new Date(date * 1000).toLocaleDateString(
      undefined,
      options
    );

    return formattedDate === today ? "Today" : formattedDate;
  };

  return (
    <div className="weathermain">
      <div className="savedcity">
        <div className="Locations1">
          <div className="cityName1">
            {Data.map((cityData, index) => (
              <div key={index}>
                <h2 style={{textAlign:'center',color:'white',textTransform:'uppercase'}}>{cityData.cityName}</h2>
                {cityData.data.map((item, index) => (
                  <Card key={index} className="weatherCard1">
                    <p>{formatDate(item.dt)}</p>
                    <img
                      src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                      alt="Weather icon"
                      style={{
                        height: "50px",
                        width: "50px",
                        objectFit: "cover",
                      }}
                    />
                    <p>Temperature: {kelvinToFahrenheit(item.main.temp)} °F</p>
                    <p>
                      Feels Like: {kelvinToFahrenheit(item.main.feels_like)} °F
                    </p>
                    <p>Speed: {item.wind.speed}</p>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedCities;
