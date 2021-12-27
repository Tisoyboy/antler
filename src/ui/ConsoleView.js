// @flow strict

import JsonEditor from './json/JsonEditor';
import LoadingIndicator from './LoadingIndicator';
import HueBridge from '../api/HueBridge';
import HueBridgeList from '../api/HueBridgeList';
import Settings from '../api/Settings';
import React, { Component } from 'react';

import type { Element } from 'React';

type PropsType = {
  match: {
    params: {
      id: string,
    },
  },
};

type StateType = {
  bridge: ?HueBridge,
  method: string,
  path: string,
  body: ?string,
  json: ?{},
  network: 'unsent' | 'loading' | 'done',
};

class ConsoleView extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    const settings = Settings.read();
    this.state = {
      bridge: null,
      method: settings.lastConsoleMethod || 'get',
      path: settings.lastConsolePath || '/config',
      body: null