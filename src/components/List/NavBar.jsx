import React, {useRef} from 'react'

const NavBar = ({ addCity }) => {
  const cityInput = useRef(null);

  const addCityClick = () => {
    if (cityInput.current.value === '') return;
    addCity(cityInput.current.value.toLowerCase());
    cityInput.current.value = '';
  }
  return (
    <nav>
      <div>
        <h2>Vema Weather App</h2>
      </div>
      <div className='search'>
        <input ref={cityInput} type='text' placeholder='Enter city name' />
        <button className='btn btn-primary margin-left' onClick={addCityClick}>
          Add to list
        </button>
      </div>
    </nav>
  )
}

export default NavBar