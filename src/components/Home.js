import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import axios from 'axios';

function Home() {
    const [locationLabel, setlocationLabel] = useState('');
    const [data,setData] = useState('');
    
    const searchLocation =  (event) => {
        if(event.key === "Enter") {
            
            Geocode.setApiKey("AIzaSyDLJ6pwEQmLXv7TwQRkYYNrRzAZPyhBOZY");  
    
            Geocode.fromAddress(locationLabel).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    
                    axios
                        .get('https://api.openweathermap.org/data/2.5/weather?lat='+lat + '&lon='+lng+'&appid=c321edc485309c8d6fe4337dd1118c96')
                        .then((response) => {
                            setData(response.data)
                            console.log(response.data);
                        });
                },
                (error) => {
                    console.log("error");
                }
            );
        }
    }
    return (
        <div className="application">
            <div className="search">
                <input
                value={locationLabel}
                onChange={event => setlocationLabel(event.target.value)}
                onKeyPress={searchLocation}
                placeholder='Enter Location'
                type="text" />
            </div>
            <div className="container">
                <div className="top">
                <div className="location">
                    <p>{data.name}</p>
                </div>
                <div className="temp">
                    {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                </div>
                <div className="description">
                    {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>
                <div>
                    {data.name !== undefined &&
                    <div>
                        <div className="feels">
                        {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                        <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                        </div>
                        <div className="wind">
                        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                        <p>Wind Speed</p>
                        </div>
                    </div>
                    }
                </div>
                

                </div>

                
                <div className="bottom">

                </div>



            </div>
            
        </div>
    );
}

export default Home;