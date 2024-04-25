import getApplicationByReferenceNumber from '.';
import generateFullApplicationByReferenceNumberVariables from '../generate-full-application-by-reference-number-variables';
import api from '../../api';
import { mockApplication, referenceNumber } from '../../test-mocks';
import LOSS_PAYEE_ROUTES from '../../constants/routes/insurance/policy/loss-payee';

const { LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT } = LOSS_PAYEE_ROUTES;

describe('helpers/get-application-by-reference-number', () => {
  let getApplicationSpy;

  const variables = generateFullApplicationByReferenceNumberVariables(referenceNumber.toString(), LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT);

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
      getApplicationSpy = jest.fn(() => Promise.reject(new Error(mockErrorMessage)));
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
