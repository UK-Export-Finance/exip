import save from '.';
import api from '../../../../../api';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockSpyPromiseRejection } from '../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, HAS_DIFFERENT_TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/save-data/company-details - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    [HAS_DIFFERENT_TRADING_NAME]: 'true',
    [HAS_DIFFERENT_TRADING_ADDRESS]: 'false',
    [PHONE_NUMBER]: '*99',
  };

  beforeEach(() => {
    api.keystone.application.update.company = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = mockSpyPromiseRejection;
      api.keystone.application.update.company = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.companyDetails(mockApplication, mockFormBody);
      } catch (error) {
        const expected = new Error("Updating application's company details");
        expect(error).toEqual(expected);
      }
    });
  });
});
