import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import './App.css';
import Route from './route';

const mountNode = document.getElementById('app');
ReactDOM.render(<Route />, mountNode);
