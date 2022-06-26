import React, {useEffect, useState, useContext} from 'react';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import ApiKeyContext from '../../contexts/apiKeyContext';
import api from '../../middleware/api';
import WeatherIcon from '../List/WeatherIcon';
import { BiArrowBack } from 'react-icons/bi'
import { BsCloudRain , BsMoisture} from 'react-icons/bs'
import { CgArrowUpO } from 'react-icons/cg'
import { MdCompress } from 'react-icons/md'
import {WiSunrise, WiSunset}from 'react-icons/wi'
import { toHuman } from '../../middleware/helpers';
import './index.css';
import WeatherBox from './WeatherBox';
import Spinner from '../Spinner';

const Details = () => {
  const state = useContext(ApiKeyContext);
  let params = useParams();

  const  { state: {sys} }  = useLocation();

  const [weathersData, setWeathersData] = useState(null);
  const [spinnerActive, setSpinnerActive] = useState(false);

  useEffect(() => {
    let dataFetched = false;

    const fetchData = async () => {
      setSpinnerActive(true)
      const { data } = await api.get('https://api.openweathermap.org/data/2.5/forecast', {
        id: params.id,
        appid: state.apiKey,
        units: 'metric',
        lang: 'en',
      });
      setSpinnerActive(false)
      if (data.cod === '200') {
        setWeathersData(data);
      } else {
        console.log('error');
      }
    };

    if (!dataFetched) fetchData();

    return () => (dataFetched = true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Spinner active={spinnerActive} />
      {weathersData &&
        <div className='details'>
          <div className='details__content'>
            <NavLink to='/list'><BiArrowBack /></NavLink>
            <div className='details__content-header'>
              <div className='details__content-row'>
                <div>
                <h1>{ weathersData.city.name }</h1>
                  <h3> {weathersData.list[0].weather[0].description}</h3>
                </div>
                <div>
                  <div className='icon'>
                    <WeatherIcon icon={weathersData.list[0].weather[0].icon} />
                  </div>
                  <h2>{weathersData.list[0].main.temp.toFixed(1)} °C</h2>
                </div>
              </div>

              <div className='content__header-additional'>
                <div className='additional-row'>
                  <WiSunrise />
                  {toHuman(sys.sunrise).split(' ')[1]} -
                  <WiSunset />
                  {toHuman(sys.sunset).split(' ')[1]}
                </div>

                <div className='additional-row'>
                  <BsCloudRain  />
                  { weathersData.list[0].rain ? weathersData.list[0].rain['3h'].toFixed(0) : '0' }%
                </div>

                <div className="additional-row">
                  <CgArrowUpO style={{transform: `rotate(${weathersData.list[0].wind.deg}deg)`}} />
                  { weathersData.list[0].wind.speed} m/s
                </div>

                <div className="additional-row">
                  <MdCompress />
                  { weathersData.list[0].main.pressure} hPa
                </div>

                <div className="additional-row">
                  <BsMoisture />
                  { weathersData.list[0].main.humidity}%
                </div>
              </div>
              <hr />
            </div>
            <div className="contentList margin-top">
              <ul>
                {weathersData.list.map(w=><WeatherBox key={w.dt + w.weather[0].id} weather={w} />)}
              </ul>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Details;
