import getApplicationByReferenceNumber from '.';
import api from '../../api';
import { mockApplication, referenceNumber } from '../../test-mocks';

describe('helpers/get-application-by-reference-number', () => {
  let getApplicationSpy;

  const variables = {
    referenceNumber,
    decryptFinancialUk: true,
  };

  it('should call api.keystone.application.getByReferenceNumber', async () => {
    getApplicationSpy = jest.fn(() => Promise.resolve(mockApplication));
    api.keystone.application.getByReferenceNumber = getApplicationSpy;

    await getApplicationByReferenceNumber(variables);

    expect(getApplicationSpy).toHaveBeenCalledTimes(1);
    expect(getApplicationSpy).toHaveBeenCalledWith(variables);
  });

  describe('when there is no application', () => {
    it('should return false', async () => {
      getApplicationSpy = jest.fn(() => Promise.resolve());
      api.keystone.application.getByReferenceNumber = getApplicationSpy;

      const result = await getApplicationByReferenceNumber(variables);

      expect(result).toEqual(false);
    });
  });

  describe('when there is no application.id', () => {
    it('should return false', async () => {
      getApplicationSpy = jest.fn(() => Promise.resolve({}));
      api.keystone.application.get = getApplicationSpy;

      const result = await getApplicationByReferenceNumber(variables);

      expect(result).toEqual(false);
    });
  });

  describe('when the api call fails', () => {
    it('should return false', async () => {
      const mockErrorMessage = 'Mock error';
      getApplicationSpy = jest.fn(() => Promise.reject(mockErrorMessage));
      api.keystone.application.getByReferenceNumber = getApplicationSpy;

      try {
        await getApplicationByReferenceNumber(variables);
      } catch (err) {
        expect(err).toEqual(new Error(`Getting application by reference number ${mockErrorMessage}`));
      }
    });
  });

  it('should return the application', async () => {
    getApplicationSpy = jest.fn(() => Promise.resolve(mockApplication));
    api.keystone.application.getByReferenceNumber = getApplicationSpy;

    const result = await getApplicationByReferenceNumber(variables);

    expect(result).toEqual(mockApplication);
  });
});
