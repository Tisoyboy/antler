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
      body: null,
      json: null,
      network: 'unsent',
    };
  }

  getActiveBridge(): ?HueBridge {
    const acitveBridgeId =
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id;
    if (!acitveBridgeId) {
      return null;
    }

    const maybeBridge = HueBridge.getById(acitveBridgeId);
    if (maybeBridge) {
      return maybeBridge;
    } else {
      HueBridgeList.load();
      return HueBridge.getAuthorizedById(acitveBridgeId);
    }
  }

  onMethodClick: (method: string) => void = (method: string) => {
    const settings = Settings.read();
    settings.lastConsoleMethod = method;
    Settings.write(settings);
    this.setState({
      method,
    });
  };

  onPathChange: (event: SyntheticInputEvent<HTMLInputElement>) => void = (
    event: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    const path = event.target.value;
    const settings = Settings.read();
    settings.lastConsolePath = path;
    Settings.write(settings);
    this.setState({
      path,
    });
  };

  onBodyChange: (event: SyntheticInputEvent<HTMLInputElement>) => void = (
    event: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    this.setState({
      body: event.target.value,
    });
  };

  onSendClick: () => void = () => {
    const bridge = this.state.bridge;
    if (bridge) {
      this.setState({
        network: 'loading',
      });
      bridge
        .fetch(this.state.path, {
          method: this.state.method.toUpperCase(),
          body: this.state.body,
        })
        .then((json) => {
          console.log(json);
          this.setState({
            json,
            network: 'done',
          });
        });
    }
  };

  componentDidMount() {
    const bridge = this.getActiveBridge();
    this.setState({
      bridge,
    });
  }

  render(): Element<'div'> {
    return (
      <div>
        <div className="card my-3">
          <div className="card-body">
            <div className="form-inline">
              <div className="input-group mb-2 mb-sm-0 mr-sm-2 flex-fill">
                <div className="input-group-prepend">
                  <button
                    id="method"
                    type="button"
                    className="input-group-text btn btn-light dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {this.state.method.toUpperCase()}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="method">
                    <button
                      className={
                        'dropdown-item' +
                        (this.state.method === 'get' ? ' active' : '')
                      }
                      onClick={this.onMethodClick.bind(this, 'get')}
                    >
                      GET
                    </button>
                    <button
                      className={
                        'dropdown-item' +
                     