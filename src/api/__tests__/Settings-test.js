import Settings from '../Settings';
import Storage from 'versioned-storage';

jest.mock('versioned-storage');

beforeEach(() => {
  let storedSettings = null;
  Storage.mock.instances[0].write = jest.fn().mockImplementation((settings) => {
    storedSettings = settings;
  });
  Storage.mock.instances[0].read = jest.fn().mockImplementation(() => {
    return storedSettings;
  });
});

it('reads settings previously written', () => {
  expect(Storage.mock.instances).toHaveLength(1);
  const storageInstance = Storage.mock.instances[0];

  const firstSettings = {
    appId: Math.random().toString(),
    clientId: Math.random().toString(),
    clientSecret: Math.random().toString(),
  };

  Settings.write(firstSettings);
  expect(storageInstance.write).