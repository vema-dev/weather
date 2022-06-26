import React, { createContext, useState } from 'react';

let storedKey = localStorage.getItem('apiKey');
storedKey = storedKey ? JSON.parse(storedKey).apiKey : null;

console.log('stored: ' + storedKey);
const ApiKeyContext = createContext({
  apiKey: storedKey,
  spinner: false,
  setSpinner: async (key) => {},
  setKey: (key) => {},
  delKey: () => {},
});

export function ApiKeyContextProvider(props) {
  const [apiKey, setApiKey] = useState(storedKey);

  const setKey = (key) => {
    localStorage.setItem('apiKey', JSON.stringify({ apiKey: key }));
    setApiKey(() => key);
  };

  const delKey = () => {
    localStorage.removeItem('apiKey');
    setApiKey(() => null);
  };

  const context = {
    apiKey: apiKey,
    spinner: false,
    setKey,
    delKey,
  };

  return <ApiKeyContext.Provider value={context}>{props.children}</ApiKeyContext.Provider>;
}

export default ApiKeyContext;
