import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Nav, Navbar } from "react-bootstrap";
import './Weather.css';
import { useParams } from "react-router-dom";

function WeatherPage() {
  const [city, setCity] = useState("");
  const [searchcity, setSearchCity] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  
  const { userid } = useParams();
  console.log(userid);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=acbdb25ae2eb67288b092f3358a81bf2`;

      axios.get(url).then((response) => {
        const city = response.data.city.name;
        setCity(city);
      });
    });
  }, []);

  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=acbdb25ae2eb67288b092f3358a81bf2`
        )
        .then((response) => {
          const filteredData = response.data.list.filter((item, index) => {
            return index % 8 === 0;
          });
          setData(filteredData);
        });
    }
  }, [city]);

  const handleChange = (event) => {
    if (event.target.value === "") {
      setSearchCity("");
      setSearchData([]);
    } else {
      setSearchCity(event.target.value);
    }
  };

  const search = (event) => {
    if (event.key === "Enter") {
      if (!searchcity) {
        alert("Enter a city name");
        return;
      }

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchcity}&appid=acbdb25ae2eb67288b092f3358a81bf2`
        )
        .then((disp) => {
          const filteredData = disp.data.list.filter((item, index) => {
            return index % 8 === 0;
          });
          setSearchData(filteredData);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            alert("Wrong city name");
          } else {
            console.log(error);
          }
        });
    }
  };

  const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(1);
  }

  const formatDate = (date) => {
    const options = { weekday: 'long' };
    const today = new Date().toLocaleDateString(undefined, options);

    const formattedDate = new Date(date * 1000).toLocaleDateString(undefined, options);

    return formattedDate === today ? 'Today' : formattedDate;
  }

  const saveLocation = () => {
    // Assuming mylocation and userid are defined somewhere
    const savedData = {
      mylocations: searchcity,
      userid:userid
    };

    axios.post('http://localhost:5050/Loc', savedData)
      .then(response => {
        console.log(response);
        alert("Location saved successfully!");
      })
      .catch(error => {
        console.error("Error saving location:", error);
        alert("Failed to save location!");
      });
  };

  return (
    <div className="weathermain">
      <div className="home1"> <Navbar expand="lg" className="Nav1">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
           <div className="inputField ms-auto">
        <input
          type="text"
          placeholder="search "
          onChange={handleChange}
          onKeyPress={search}
          className="text-center"
        />
      </div>
          <Nav className="ms-auto">
           
        <Nav.Link href={`/saved/${userid}`}>Saved citys</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
      <div className="weatherinfo">
        <div className="cityName">
          <div><h1 className="Wtext">My Location</h1><br /><h2 className="Wtext">{city}</h2><br /></div>
          {data.map((item, index) => (
            <div key={index}>
              <Card className="weatherCard">
                <p>{formatDate(item.dt)}</p>
                <img
                  src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt="Weather icon"
                  style={{
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                  }} />
                <p>Temperature: {kelvinToFahrenheit(item.main.temp)}</p>
                <p>Feels Like: {kelvinToFahrenheit(item.main.feels_like)}</p>
                <p>Speed: {item.wind.speed}</p>
              </Card>
            </div>
          ))}
        </div>

        <div>
          <div className="weather">
            <div className="Locations">
              <div className="cityName">
                 <h2 className="Wtext">{searchcity}</h2>
                {
                  searchData.map((item, index) => (
                    <div key={index}>
                      <Card className="weatherCard">
                        <p> {formatDate(item.dt)}</p>
                        <img
                          src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                          alt="Weather icon"
                          style={{
                            height: "50px",
                            width: "50px",
                            objectFit: "cover",
                          }} />
                        <p>Temperature: {kelvinToFahrenheit(item.main.temp)} °F</p>
                        <p>Feels Like: {item.main.feels_like}</p>
                        <p>Speed: {item.wind.speed}</p>
                      </Card>
                    </div>
                  ))
                }
                {searchcity ? <Button onClick={saveLocation}>SAVE</Button>:null}
              </div>
            </div>
          </div>
        </div>
      </div></div>
      
    </div>
  );
}

export default WeatherPage;
