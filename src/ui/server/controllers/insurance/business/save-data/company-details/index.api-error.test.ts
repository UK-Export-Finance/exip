import save from '.';
import api from '../../../../../api';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication } from '../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/save-data/company-details - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    [HAS_DIFFERENT_TRADING_NAME]: 'true',
    [TRADING_ADDRESS]: 'false',
    [PHONE_NUMBER]: '*99',
  };

  beforeEach(() => {
    api.keystone.application.update.company = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.company = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.companyDetails(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error("Updating application's companyDetails");
        expect(err).toEqual(expected);
      }
    });
  });
});
