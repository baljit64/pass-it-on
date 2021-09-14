import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import Animate from 'animate.css-react'
// import 'animate.css/animate.css'

import axios from 'axios';
axios.defaults.baseURL = 'https://pass-it-on123.herokuapp.com/';

ReactDOM.render(


  <App />
  ,
  document.getElementById('root')
);



