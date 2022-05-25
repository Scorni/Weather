import React, { useState } from "react";
import Geocode from "react-geocode";
import axios from 'axios';
import SunSvg from '../assets/svg/sun.svg';
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
                        .get('https://api.openweathermap.org/data/2.5/weather?lat='+lat + '&lon='+lng+'&appid=c321edc485309c8d6fe4337dd1118c96&units=metric&lang=fr')
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
                        {data.name !== undefined && 
                            <div className="location">
                                <p id="test">{locationLabel}</p>

                                <svg width="50" height="50" viewBox="0 0 472 472" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Sun">
                                        <g id="Extern_beam">
                                        <path id="Vector" d="M236 104C231.6 104 228 100.4 228 96V8C228 3.6 231.6 0 236 0C240.4 0 244 3.6 244 8V96C244 100.4 240.4 104 236 104Z" fill="#C39215"/>
                                        <path id="Vector_2" d="M236 472C231.6 472 228 468.4 228 464V376C228 371.6 231.6 368 236 368C240.4 368 244 371.6 244 376V464C244 468.4 240.4 472 236 472Z" fill="#C39215"/>
                                        <path id="Vector_3" d="M96 244H8C3.6 244 0 240.4 0 236C0 231.6 3.6 228 8 228H96C100.4 228 104 231.6 104 236C104 240.4 100.4 244 96 244Z" fill="#C39215"/>
                                        <path id="Vector_4" d="M464 244H376C371.6 244 368 240.4 368 236C368 231.6 371.6 228 376 228H464C468.4 228 472 231.6 472 236C472 240.4 468.4 244 464 244Z" fill="#C39215"/>
                                        <path id="Vector_5" d="M146.4 152.4C144.4 152.4 142.4 151.6 140.8 150L87.2 96.4C84 93.2 84 88.4 87.2 85.2C90.4 82 95.2 82 98.4 85.2L152 138.8C155.2 142 155.2 146.8 152 150C150.4 151.6 148.4 152.4 146.4 152.4Z" fill="#C39215"/>
                                        <path id="Vector_6" d="M379.2 385.2C377.2 385.2 375.2 384.4 373.6 382.8L322.8 332C319.6 328.8 319.6 324 322.8 320.8C326 317.6 330.8 317.6 334 320.8L384.8 371.6C388 374.8 388 379.6 384.8 382.8C383.2 384.4 381.2 385.2 379.2 385.2Z" fill="#C39215"/>
                                        <path id="Vector_7" d="M95.6 385.2C93.6 385.2 91.6 384.4 90 382.8C86.8 379.6 86.8 374.8 90 371.6L140.8 320.8C144 317.6 148.8 317.6 152 320.8C155.2 324 155.2 328.8 152 332L101.2 382.8C99.6 384.4 97.6 385.2 95.6 385.2Z" fill="#C39215"/>
                                        <path id="Vector_8" d="M328.4 152.4C326.4 152.4 324.4 151.6 322.8 150C319.6 146.8 319.6 142 322.8 138.8L373.6 88C376.8 84.8 381.6 84.8 384.8 88C388 91.2 388 96 384.8 99.2L334 150C332.4 151.6 330.4 152.4 328.4 152.4Z" fill="#C39215"/>
                                        </g>
                                        <g id="Circle_sun">
                                        <path id="Vector_9" d="M236 365C306.692 365 364 307.692 364 237C364 166.308 306.692 109 236 109C165.308 109 108 166.308 108 237C108 307.692 165.308 365 236 365Z" fill="#FFE53C"/>
                                        <path id="Vector_10" d="M236 373C161.2 373 100 311.8 100 237C100 162.2 161.2 101 236 101C310.8 101 372 162.2 372 237C372 311.8 310.8 373 236 373ZM236 117C170 117 116 171 116 237C116 303 170 357 236 357C302 357 356 303 356 237C356 171 302 117 236 117Z" fill="#C39215"/>
                                        </g>
                                        <path id="Vector_11" d="M162 183.2C163.2 181.6 164.4 180.4 165.2 178.8Z" fill="#FFE53C"/>
                                        <g id="Inside_beam">
                                        <path id="Vector_12" d="M162 191.2C160.4 191.2 158.8 190.8 157.2 189.6C153.6 186.8 152.8 182 155.6 178.4C156 178 156.4 177.2 156.8 176.8C157.2 176.4 157.6 175.6 158 175.2C160 171.2 164.8 169.6 168.8 171.6C172.8 173.6 174.4 178.4 172.4 182.4C171.6 184.4 170.4 185.6 169.2 186.8C168.8 187.2 168.4 187.6 168.4 188C166.8 190 164.4 191.2 162 191.2Z" fill="#C39215"/>
                                        <path id="Vector_13" d="M175.2 311.6C173.2 311.6 171.2 310.8 170 309.6C148.8 290.4 136.8 264.4 136.8 236C136.8 227.6 138 219.2 140.4 210.4C141.6 206 146 203.6 150 204.8C154.4 206 156.8 210.4 155.6 214.4C153.6 222 152.8 229.2 152.8 236C152.8 259.6 162.8 281.6 180.4 297.6C183.6 300.4 184 305.6 181.2 308.8C179.6 310.8 177.2 311.6 175.2 311.6Z" fill="#C39215"/>
                                        </g>
                                    </g>
                                </svg>

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

                    
                <div className="bottom">
                </div>



            </div>
            
        </div>
    );
}

export default Home;