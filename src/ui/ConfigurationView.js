import JsonEditor from './json/JsonEditor';
import HueBridge from '../api/HueBridge';
import HueBridgeList from '../api/HueBridgeList';
import React, { Component } from 'react';

class ConfigurationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bridge: null,
      json: null,
    };
  }

  getActiveBridge() {
    const acitveBridgeId =
      this.props &&
      this.props.match &&
     