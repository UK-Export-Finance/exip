import contact from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockBusiness } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  EXPORTER_BUSINESS: {
    CONTACT: { POSITION },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/save-data/contact', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const { id, ...mockBusinessBody } = mockBusiness.businessContactDetail;

  const mockFormBody = mockBusinessBody;

  beforeEach(() => {
    api.keystone.application.update.businessContact = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors(POSITION, 'error', {});

    it(`should call api.keystone.application.update.businessContact with all fields but not ${POSITION}`, async () => {
      await contact.save(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody, mockValidationErrors.errorList));
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.business.businessContactDetail.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await contact.save(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.businessContact with all fields', async () => {
      await contact.save(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody);
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.business.businessContactDetail.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await contact.save(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
