// @flow strict

import ActiveBridge from './ActiveBridge';
import HueBridge from './HueBridge';
import Storage from 'versioned-storage';

const STORAGE_NAME = 'bridges';
const STORAGE_VERSION = 4;
const storage: Storage<Array<string>> = new Storage(
  STORAGE_NAME,
  STORAGE_VERSION,
);

const NUPNP_URL = 'https://www.meethue.com/api/nupnp';

function readStoredBridges(): Array<HueBridge> {
  const bridgeIds = storage.read() || [];
  return bridgeIds.map((id) => {
    return new HueBridge(id);
  });
}

function addBridge(bridgeId: string): void {
  const bridgeIds = storage.read() || [];
  bridgeIds.push(bridgeId);
  storage.write(bridgeIds);
}

async function discoverLocalBridges(): Promise<Array<HueBridge>> {
  const response = await fetch(NUPNP_URL);
  const json = awai