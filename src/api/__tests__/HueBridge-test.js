let HueBridge = require('../HueBridge').default;
import Settings from '../Settings';
import Storage from 'versioned-storage';

jest.mock('../Settings');
jest.mock('versioned-storage');

const TEST_BRIDGE_ID = '0123456789ABCDEF';
const TEST_BRIDGE_PROPERTIES = {
  username: 'fedcba9876543210',
  remote: true,
};

beforeEach(() => {
  jest.resetModules();
  HueBridge = require('../HueBridge').default;

  let storedBridges = null;
  Storage.mock.instances[0].write = jest.fn().mockImplementation((bridges) => {
    storedBridges = bridges;
  });
  Storage.mock.instances[0].read = jest.fn().mockImplementation(() => {
    return storedBridges;
  });
});

describe('HueBridge constructor', () => {
  it('can be created with id', () => {
    const bridge = new HueBridge(TEST_BRIDGE_ID);
    expect(bridge).not.toBeNull();
    expect(bridge.id).toBe(TEST_BRIDGE_ID);
  });

  it('can be created with id and properties', () => {
    const bridge = new HueBridge(TEST_BRIDGE_ID, TEST