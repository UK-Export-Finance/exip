import save from '.';
import api from '../../../../../api';
import { mockApplication } from '../../../../../test-mocks';

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
      updateSpy = jest.fn(() => Promise.reject(new Error('mock')));

      api.keystone.application.update.companyPostDataMigration = updateSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.companyDetailsPostMigration(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error("Updating application's company (post data migration)");
        expect(err).toEqual(expected);
      }
    });
  });
});
