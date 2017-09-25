import './css/style.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { router } from './config/routes';


const mountingPoint = document.getElementById('app');
ReactDOM.render(router, mountingPoint);