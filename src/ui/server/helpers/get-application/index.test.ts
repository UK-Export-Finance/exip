import getApplication from '.';
import api from '../../api';
import { mockApplication, mockSpyPromise, referenceNumber } from '../../test-mocks';

describe('helpers/get-application', () => {
  let getApplicationSpy;

  it('should call api.keystone.application.get', async () => {
    getApplicationSpy = jest.fn(() => Promise.resolve());
    api.keystone.application.get = getApplicationSpy;

    await getApplication(referenceNumber);

    expect(getApplicationSpy).toHaveBeenCalledTimes(1);
    expect(getApplicationSpy).toHaveBeenCalledWith(referenceNumber);
  });

  describe('when there is no application', () => {
    it('should return false', async () => {
      getApplicationSpy = jest.fn(() => Promise.resolve());
      api.keystone.application.get = getApplicationSpy;

      const result = await getApplication(referenceNumber);

      expect(result).toEqual(false);
    });
  });

  describe('when there is no application.policy', () => {
    it('should return false', async () => {
      getApplicationSpy = mockSpyPromise;
      api.keystone.application.get = getApplicationSpy;

      const result = await getApplication(referenceNumber);

      expect(result).toEqual(false);
    });
  });

  describe('when there is no application.id', () => {
    it('should return false', async () => {
      getApplicationSpy = mockSpyPromise;
      api.keystone.application.get = getApplicationSpy;

      const result = await getApplication(referenceNumber);

      expect(result).toEqual(false);
    });
  });

  describe('when the api call fails', () => {
    it('should return false', async () => {
      const mockErrorMessage = 'Mock error';
      getApplicationSpy = jest.fn(() => Promise.reject(mockErrorMessage));
      api.keystone.application.get = getApplicationSpy;

      try {
        await getApplication(referenceNumber);
      } catch (err) {
        expect(err).toEqual(new Error(`Getting application ${mockErrorMessage}`));
      }
    });
  });

  it('should return the application', async () => {
    getApplicationSpy = jest.fn(() => Promise.resolve(mockApplication));
    api.keystone.application.get = getApplicationSpy;

    const result = await getApplication(referenceNumber);

    expect(result).toEqual(mockApplication);
  });
});
