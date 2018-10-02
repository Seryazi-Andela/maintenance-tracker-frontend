import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from '../src/containers/Login/Login'
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
