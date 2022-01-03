import JsonEditor from './json/JsonEditor';
import HueColor from '../api/HueColor';
import React, { Component } from 'react';
import './Light.css';

class Light extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showJson: false,
    };
  }

  onJsonToggleClick(showJson) {
    this.setState({
      showJson,
    });
  }

  render() {
    const json = this.props.json;
    let rgb = [
      HueColor.RGB_MAX_VALUE,
      HueColor.RGB_MAX_VALUE,
      HueColor.RGB_MAX_VALUE,
    ];
    switch (json.state.colormode) {
      case 'hs':
        // Not yet supported;
        break;
      case 'xy':
        rgb = HueColor.fromXyToRgb(json.state.xy, json.state.bri);
        break;
      case 'ct':
        // Not yet supported;
        break;
      default:
        throw new Error(`Unsupported colormode: ${json.state.colormode}`);
    }
    if (!json.state.on) {
      rgb = [0, 0, 0];
    }
    const hex = HueColor.fromRgbToHex(rgb);
    const grayscale = HueColor.fromColorToGrayscale(rgb);
    const fontColor = grayscale < 1