import mapAndSave from '.';
import save from '../../save-data/contact';
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
  save.contact = mockSaveContact;

  const mockValidationErrors = generateValidationErrors(POSITION, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors ', () => {
      it('should call save.contact with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.contact(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.contact).toHaveBeenCalledTimes(1);
        expect(save.contact).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.contact(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.contact with application and populated submitted data', async () => {
        await mapAndSave.contact(mockFormBody, mockApplication);

        expect(save.contact).toHaveBeenCalledTimes(1);
        expect(save.contact).toHaveBeenCalledWith(mockApplication, mockFormBody);
      });

      it('should return true', async () => {
        const result = await mapAndSave.contact(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      const emptyMockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.contact(emptyMockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
