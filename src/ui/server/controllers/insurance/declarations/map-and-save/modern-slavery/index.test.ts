import mapAndSave from '.';
import mapSubmittedData from '../../map-submitted-data/modern-slavery';
import save from '../../save-data/modern-slavery';
import DECLARATIONS_FIELD_IDS from '../../../../../constants/field-ids/insurance/declarations';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';
import { RequestBody } from '../../../../../../types';

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS },
} = DECLARATIONS_FIELD_IDS;

describe('controllers/insurance/declarations/map-and-save/modern-slavery', () => {
  jest.mock('../../save-data/modern-slavery');

  let mockFormBody = {
    _csrf: '1234',
    [WILL_ADHERE_TO_ALL_REQUIREMENTS]: 'true',
  } as RequestBody;

  const mockSaveDeclarationModernSlavery = mockSpyPromise();
  save.declarationModernSlavery = mockSaveDeclarationModernSlavery;

  const populatedData = mapSubmittedData(mockFormBody);

  const mockValidationErrors = generateValidationErrors('mock id', 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.declarationModernSlavery with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.declarationModernSlavery(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.declarationModernSlavery).toHaveBeenCalledTimes(1);
        expect(save.declarationModernSlavery).toHaveBeenCalledWith(mockApplication, populatedData, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.declarationModernSlavery(populatedData, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      it('should call save.declarationModernSlavery with application and populated submitted data', async () => {
        await mapAndSave.declarationModernSlavery(populatedData, mockApplication);

        expect(save.declarationModernSlavery).toHaveBeenCalledTimes(1);
        expect(save.declarationModernSlavery).toHaveBeenCalledWith(mockApplication, populatedData);
      });

      it('should return true', async () => {
        const result = await mapAndSave.declarationModernSlavery(populatedData, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.declarationModernSlavery(populatedData, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
