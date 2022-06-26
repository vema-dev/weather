import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiKeyContext from '../../contexts/apiKeyContext';

import './index.css';

const Welcome = () => {
  const state = useContext(ApiKeyContext);
  console.log('welcome: ' + state.apiKey);
  const apiKeyInput = useRef(null);
  const navigate = useNavigate();

  const parseOWMApi = async () => {
    if (apiKeyInput.current.value === '') return;
    state.setKey(apiKeyInput.current.value);
    navigate('/list');
  };

  useEffect(() => {
    if (state.apiKey) navigate('/list');
    apiKeyInput.current.focus();
    // eslint-disable-next-line
  }, []);

  return (
    <section className='welcome'>
      <h2>welcome to</h2>
      <h1>vema weather app</h1>
      <p className='margin-top-double'>
        For weather data, the application requires an API key from{' '}
        <a href='https://openweathermap.org' rel='noreferrer' target='_blank'>
          openweathermap
        </a>
        .{' '}
      </p>
      <div>
        <input className='margin-top' ref={apiKeyInput} type='text' placeholder='Enter openweathermap api key' />
        <button className='btn btn-primary margin-left' onClick={parseOWMApi}>
          next
        </button>
      </div>
    </section>
  );
};

export default Welcome;
