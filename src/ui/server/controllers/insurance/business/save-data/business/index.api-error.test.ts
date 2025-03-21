import save from '.';
import api from '../../../../../api';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockSpyPromiseRejection } from '../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/save-data/business - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    [GOODS_OR_SERVICES]: 'test',
    [YEARS_EXPORTING]: '5',
    [EMPLOYEES_UK]: '3',
  };

  beforeEach(() => {
    api.keystone.application.update.business = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = mockSpyPromiseRejection;
      api.keystone.application.update.business = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.business(mockApplication, mockFormBody);
      } catch (error) {
        const expected = new Error("Updating application's business");
        expect(error).toEqual(expected);
      }
    });
  });
});
