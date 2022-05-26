import React, { useState } from "react";
import Geocode from "react-geocode";
import axios from 'axios';
import CloudSun from "./weather/CloudSun";
import RainyCloud from "./weather/RainyCloud";
import LessRainyCloud from "./weather/LessRainyCloud";
import Mist from "./weather/Mist";
import Sun from "./weather/Sun";
import Storm from "./weather/Storm";
import QuestionMark from "./QuestionMark";
function Home() {
    const [location, setlocation] = useState('');
    const [data,setData] = useState('');
    
    const searchLocation =  (event) => {
        if(event.key === "Enter") {
            
            Geocode.setApiKey("AIzaSyDLJ6pwEQmLXv7TwQRkYYNrRzAZPyhBOZY");  
            Geocode.setLanguage("fr");
            Geocode.fromAddress(location).then(
                (response) => {
                    console.log(response);
                    const { lat, lng } = response.results[0].geometry.location;
                    const formattedAdress = response.results[0].address_components[0].long_name;
                    axios
                        .get('https://api.openweathermap.org/data/2.5/weather?lat='+lat + '&lon='+lng+'&appid=c321edc485309c8d6fe4337dd1118c96&units=metric&lang=fr')
                        .then((response) => {
                            response.data["formattedAdress"] = formattedAdress
                            setData(response.data, lng)
                            console.log(response.data);
                        });
                },
                (error) => {
                    console.log("error");
                }
            );
            setlocation('')
        }
    }
    const getSVG = (description) => {
        switch(description) {
            case 'Rain':
              return <RainyCloud />;
            case 'Clouds':
              return <CloudSun />;
            case 'Mist':
            case 'Smoke':
            case 'Dust':
            case 'Fog':
            case 'Sand':
            case 'Dust':
            case 'Ash':
            case 'Squall':
            case 'Tornado':  
              return <Mist />;
            case 'Clear':
              return <Sun />;
            case 'Drizzle':
              return <LessRainyCloud />;
            case 'Thunderstorm':
              return <Storm />;
            default:
              return ;
          }
    }
    return (
        <div className="application">
            <div className="search">
                <input
                value={location}
                onChange={event => setlocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder='Enter Location'
                type="text" />
            </div>
            <div className="container">
                {data.coord === undefined &&
                    <div>
                        <QuestionMark />
                    </div>
                } 
                {data.coord !== undefined && 
                    <div className="top">
                    {data.name !== undefined && 
                        <div className="location">
                            <p id="adress">{data.formattedAdress}</p>
                            {data.weather ? getSVG(data.weather[0].main) : null}
                        </div>
                    }
                        <div className="temp">
                            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                        </div>
                        <div className="description">
                            {data.weather ? <p>{data.weather[0].description}</p> : null}
                        </div>
                        <div>
                            {data.name !== undefined &&
                            <div>
                                <div className="feels">
                                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
                                <p>Ressenti</p>
                                </div>
                                <div className="humidity">
                                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                                <p>Humidité</p>
                                </div>
                                <div className="wind">
                                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} m/s</p> : null}
                                <p>Vent</p>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                }
                

                    
                <div className="bottom">
                </div>



            </div>
            
        </div>
    );
}

export default Home;