import React from 'react'
import WeatherIcon from '../List/WeatherIcon';
import { BsCloudRain , BsMoisture} from 'react-icons/bs'
import { WiWindDeg } from 'react-icons/wi'
import { MdCompress } from 'react-icons/md'
import {toHuman} from '../../middleware/helpers'

const WeatherBox = ({ weather }) => {

  return (
    <li>
      <div className="weatherItem-wrapper">

        <small>{toHuman(weather.dt)}</small>
        <div className='font-big margin-top'>
          { weather.main.temp.toFixed()}°C
        </div>

        <div className='icon strong margin-top'>
          <WeatherIcon icon={weather.weather[0].icon} />
        </div>

        <div className='details__content-row padding'>
          <BsCloudRain  />
          { weather.rain ? weather.rain['3h'].toFixed(0) : '0' }%
        </div>

        <div className='details__content-row padding'>
          <WiWindDeg style={{transform: `rotate(${weather.wind.deg}deg)`}} />
          { weather.wind.speed} m/s
        </div>

        <div className='details__content-row padding'>
          <MdCompress />
          { weather.main.pressure} hPa
        </div>

        <div className='details__content-row padding'>
          <BsMoisture />
          { weather.main.humidity}%
        </div>

      </div>
    </li>
  )
}

export default WeatherBox