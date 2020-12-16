import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './scss/app.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Imports de components-api.
import {setPathApi} from './components-api/ConfigApi';

// Imports de redux.
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools} from 'redux-devtools-extension'

// Google Fonts
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Poppins:400,600', 'sans-serif']
  }
});

// Store de reducers.
const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(reduxThunk)));

// Configuración de la ruta del api.
setPathApi();

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
