import mapAndSave from '.';
import save from '../../save-data/modern-slavery';
import DECLARATIONS_FIELD_IDS from '../../../../../constants/field-ids/insurance/declarations';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS },
} = DECLARATIONS_FIELD_IDS;

describe('controllers/insurance/declarations/map-and-save/modern-slavery', () => {
  jest.mock('../../save-data/modern-slavery');

  let mockFormBody = {
    _csrf: '1234',
    [WILL_ADHERE_TO_ALL_REQUIREMENTS]: 'true',
  };

  const mockSaveDeclarationModernSlavery = mockSpyPromise();
  save.declarationModernSlavery = mockSaveDeclarationModernSlavery;

  const mockValidationErrors = generateValidationErrors('mock id', 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.declarationModernSlavery with application, submitted data and validationErrors.errorList', async () => {
        await mapAndSave.declarationModernSlavery(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.declarationModernSlavery).toHaveBeenCalledTimes(1);
        expect(save.declarationModernSlavery).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.declarationModernSlavery(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      it('should call save.declarationModernSlavery with application and submitted data', async () => {
        await mapAndSave.declarationModernSlavery(mockFormBody, mockApplication);

        expect(save.declarationModernSlavery).toHaveBeenCalledTimes(1);
        expect(save.declarationModernSlavery).toHaveBeenCalledWith(mockApplication, mockFormBody);
      });

      it('should return true', async () => {
        const result = await mapAndSave.declarationModernSlavery(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.declarationModernSlavery(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
