import save from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/business/save-data/companies-house-search-data', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    mock: true,
  };

  beforeEach(() => {
    api.keystone.application.update.companyPostDataMigration = updateSpy;
  });

  it('should call api.keystone.application.update.companyPostDataMigration', async () => {
    await save.companyDetailsPostMigration(mockApplication, mockFormBody);

    expect(updateSpy).toHaveBeenCalledTimes(1);

    const expectedSanitisedData = sanitiseData(mockFormBody);
    expect(updateSpy).toHaveBeenCalledWith(mockApplication.company.id, expectedSanitisedData);
  });

  it('should return the API response', async () => {
    const result = await save.companyDetailsPostMigration(mockApplication, mockFormBody);

    expect(result).toEqual(mockUpdateApplicationResponse);
  });
});
