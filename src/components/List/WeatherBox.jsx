import React from 'react'
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from "react-router-dom";
import WeatherIcon from './WeatherIcon';

const WeatherBox = ({weather, deleteItem}) => {
  let navigate = useNavigate();

  const navigateTo = (itemID, e) => {
    navigate('/details/' + itemID, {state:{sys: weather.sys}});
  }
  return (
    <li>
      <div className="listbox__item" onClick={()=>navigateTo(weather.id)}>
        <div>
          <span>{weather.name}</span>
          <div className='font-big'>
            { weather.main.temp.toFixed()}°C
          </div>
        </div>
        <div className='icon'>
          <WeatherIcon icon={weather.weather[0].icon} />
        </div>
        <div className='badge'>
          <TiDelete onClick={(e) => { e.stopPropagation(); deleteItem(weather.id) }}/>
        </div>
      </div>
    </li>
  )
}

export default WeatherBox