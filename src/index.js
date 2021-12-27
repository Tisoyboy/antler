import HueBridge from './api/HueBridge';
import HueBridgeList from './api/HueBridgeList';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import App from './App';
import Settings from './api/Settings';
import ActiveBridge from './api/ActiveBridge';
import registerServiceWorker from './registerServiceWorker';

function oauthSuccess(url) {
  window.location.href = url;
  debugger;
}

function oauthFailure(url) {
  alert('OAuth failure');
  window.location.href = url;
  debugger;
  throw new E