import contact from '.';
import contactSave from '../../save-data/contact';
import { mockApplication, mockBusiness } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    CONTACT: { POSITION },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/contact', () => {
  jest.mock('../../save-data/contact');

  const { id, ...mockBusinessBody } = mockBusiness.businessContactDetail;

  const mockFormBody = {
    _csrf: '1234',
    ...mockBusinessBody,
  };

  const mockSaveContact = jest.fn(() => Promise.resolve({}));
  contactSave.save = mockSaveContact;

  const mockValidationErrors = generateValidationErrors(POSITION, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors ', () => {
      it('should call contactSave.save with application, populated submitted data and validationErrors.errorList', async () => {
        await contact.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

        expect(contactSave.save).toHaveBeenCalledTimes(1);
        expect(contactSave.save).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await contact.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call contactSave.save with application and populated submitted data', async () => {
        await contact.mapAndSave(mockFormBody, mockApplication);

        expect(contactSave.save).toHaveBeenCalledTimes(1);
        expect(contactSave.save).toHaveBeenCalledWith(mockApplication, mockFormBody);
      });

      it('should return true', async () => {
        const result = await contact.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      const emptyMockFormBody = { _csrf: '1234' };

      const result = await contact.mapAndSave(emptyMockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
