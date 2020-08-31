import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import AppWithPromises from './AppWithPromises';

ReactDOM.render(
  <React.StrictMode>
    {/* API Implemented With Async/Await */}
    <App />
    {/* API Implemeneted With Promises, uncomment below code to see the output. */}
    {/* <AppWithPromises/> */}
  </React.StrictMode>,
  document.getElementById('root')
);
