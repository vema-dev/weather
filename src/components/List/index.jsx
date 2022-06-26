import React, { useEffect, useContext, useState } from 'react';
import ApiKeyContext from '../../contexts/apiKeyContext';
import api from '../../middleware/api';
import LocationList from './LocationList';
import NavBar from './NavBar';
import './index.css';
import Spinner from '../Spinner';
import Alert from '../Alert';

const List = () => {
  const state = useContext(ApiKeyContext);

  const [weathersData, setWeathersData] = useState([]);
  const [cities, setCities] = useState([]);
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [alertBox, setAlertBox] = useState({text: '', active: false});

  const showAlert = (text) => {
    setAlertBox(state => {
      return {
        text: text,
        active: !state.active
      }
    })
    setTimeout(() => {
      setAlertBox({text: '', active: false})
    }, 3000);
  }

  const fetchData = async (city) => {
    setSpinnerActive(true)
    const { data, status } = await api.get('https://api.openweathermap.org/data/2.5/weather', {
      ...(!isNaN(city) ? {id: city} : {q:city}),
      appid: state.apiKey,
      units: 'metric',
      lang: 'en',
    });

    if (status === 404) {
      showAlert('City not found');
    } else if(status === 429) {
      showAlert('Rate limit exceeded');
    }  else if(status === 401) {
      showAlert('Invalid API key');
    }

    setSpinnerActive(false);
    if(data.cod===200) { return data} else {return null}
  };

  useEffect(() => {
    if (localStorage.getItem('cities')) {
      const tmpCities = JSON.parse(localStorage.getItem('cities'))
      setCities(tmpCities)
      tmpCities.forEach(async (city) => {
        const cityData = await fetchData(city);
        if(cityData) setWeathersData(old => [...old, cityData]);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities])

  const deleteCity = (itemID) => {
    setCities(old => old.filter(city => city !== itemID));
    setWeathersData(old => old.filter(city => city.id !== itemID));
  }

  const addCity = async (city) => {
    const cityData = await fetchData(city);
    if (cityData) {
      setWeathersData(old => [...old, cityData]);
      setCities(old => [...old, cityData.id]);
    }
  }
  return (
    <>
      <Alert alert={alertBox} />
      <Spinner active={spinnerActive} />
      <NavBar addCity={addCity} />
      <LocationList weathers={weathersData} deleteItem={deleteCity}/>
    </>
  );
};

export default List;
