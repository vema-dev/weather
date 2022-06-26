import React from 'react'
import WeatherBox from './WeatherBox'
const LocationList = (props) => {

  return (
    <ul className='listbox'>
      {!props.weathers.length && <li><strong>The list is empty. Add a city code.</strong></li>}
      {
        props.weathers.map(w => {
          return <WeatherBox key={w.id} weather={w} deleteItem={ props.deleteItem }/>
        })
      }
    </ul>
  )
}

export default LocationList