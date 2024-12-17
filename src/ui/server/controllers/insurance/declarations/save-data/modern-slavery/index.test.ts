import save from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockSpyPromiseRejection } from '../../../../../test-mocks';

const {
  DECLARATIONS: {
    MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/declarations/save-data/modern-slavery', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    [WILL_ADHERE_TO_ALL_REQUIREMENTS]: 'true',
  };

  beforeEach(() => {
    api.keystone.application.update.declarationModernSlavery = updateApplicationSpy;
  });

  it('should return the API response', async () => {
    const result = await save.declarationModernSlavery(mockApplication, mockFormBody);

    expect(result).toEqual(mockUpdateApplicationResponse);
  });

  it('should call api.keystone.application.update.declarationModernSlavery with declaration ID and sanitised data without empty fields', async () => {
    await save.declarationModernSlavery(mockApplication, mockFormBody);

    expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

    const fieldsWithValues = stripEmptyFormFields(mockFormBody);

    const expectedData = sanitiseData(fieldsWithValues);

    expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.declaration.id, expectedData);
  });

  it('should return the API response', async () => {
    const result = await save.declarationModernSlavery(mockApplication, mockFormBody);

    expect(result).toEqual(mockUpdateApplicationResponse);
  });

  describe('when there is an error calling the API', () => {
    beforeEach(() => {
      updateApplicationSpy = mockSpyPromiseRejection;
      api.keystone.application.update.declarationModernSlavery = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.declarationModernSlavery(mockApplication, mockFormBody);
      } catch (error) {
        const expected = new Error("Updating application's declaration modern slavery");
        expect(error).toEqual(expected);
      }
    });
  });
});
