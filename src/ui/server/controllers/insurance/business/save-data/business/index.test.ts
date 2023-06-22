import save from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/save-data/business', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    [GOODS_OR_SERVICES]: 'test',
    [YEARS_EXPORTING]: '5',
    [EMPLOYEES_UK]: '3',
    [EMPLOYEES_INTERNATIONAL]: '25',
  };

  beforeEach(() => {
    api.keystone.application.update.business = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors(EMPLOYEES_UK, 'error', {});

    it(`should call api.keystone.application.update.business with ${GOODS_OR_SERVICES}, ${YEARS_EXPORTING}, ${EMPLOYEES_INTERNATIONAL} but not ${EMPLOYEES_UK}`, async () => {
      await save.business(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody, mockValidationErrors.errorList));
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.business.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.business(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it(`should call api.keystone.application.update.business with ${GOODS_OR_SERVICES}, ${YEARS_EXPORTING}, ${EMPLOYEES_INTERNATIONAL} and ${EMPLOYEES_UK}`, async () => {
      await save.business(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody);
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.business.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.business(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
