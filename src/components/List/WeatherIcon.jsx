import React from 'react'
import { WiDaySunny, WiMoonAltNew, WiDaySunnyOvercast, WiNightAltPartlyCloudy, WiCloud, WiCloudy, WiShowers, WiDayRainMix, WiNightAltHail, WiDayThunderstorm, WiNightAltThunderstorm, WiDaySnow, WiNightAltSnow, WiFog } from "react-icons/wi";

const icons = {
  '01d': <WiDaySunny />,
  '01n': <WiMoonAltNew />,
  '02d': <WiDaySunnyOvercast />,
  '02n': <WiNightAltPartlyCloudy />,
  '03d': <WiCloud />,
  '03n': <WiCloud />,
  '04d': <WiCloudy />,
  '04n': <WiCloudy />,
  '09d': <WiShowers />,
  '09n': <WiShowers />,
  '10d': <WiDayRainMix />,
  '10n': <WiNightAltHail />,
  '11d': <WiDayThunderstorm />,
  '11n': <WiNightAltThunderstorm />,
  '13d': <WiDaySnow />,
  '13n': <WiNightAltSnow />,
  '50d': <WiFog />,
  '50n': <WiFog />
}

const WeatherIcon = ({icon}) => {
  return icons[icon];
}

export default WeatherIcon