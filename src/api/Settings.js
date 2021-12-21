// @flow strict

import Storage from 'versioned-storage';

type SettingsType = {
  // OAuth settings
  appId?: string,
  clientId?: string,
  clientSecret?: string,

  // Console last state
  lastConsoleMethod?: string,
  lastConsolePath?: string,
};

const STOR