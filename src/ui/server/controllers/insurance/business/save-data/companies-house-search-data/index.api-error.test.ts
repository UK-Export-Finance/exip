import save from '.';
import api from '../../../../../api';
import { mockApplication, mockSpyPromiseRejection } from '../../../../../test-mocks';

describe('controllers/insurance/business/save-data/companies-house-search-data - API error', () => {
  let updateSpy = jest.fn(() => Promise.resolve(true));

  const mockFormBody = {
    mock: true,
  };

  beforeEach(() => {
    api.keystone.application.update.companyPostDataMigration = updateSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateSpy = mockSpyPromiseRejection;

      api.keystone.application.update.companyPostDataMigration = updateSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.companyDetailsPostMigration(mockApplication, mockFormBody);
      } catch (error) {
        const expected = new Error("Updating application's company (post data migration)");
        expect(error).toEqual(expected);
      }
    });
  });
});
