import LoadingCard from './LoadingCard';
import Light from './Light';
import HueBridge from '../api/HueBridge';
import HueBridgeList from '../api/HueBridgeList';
import React, { Component } from 'react';

class LightsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    