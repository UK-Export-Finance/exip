import mapAndSave from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import mapSubmittedData from '../../map-submitted-data/policy';
import save from '../../save-data/policy';
import generateValidationErrors from '../../single-contract-policy/validation';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';
import { RequestBody } from '../../../../../../types';

const {
  CONTRACT_POLICY: { POLICY_CURRENCY_CODE },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/policy', () => {
  jest.mock('../../save-data/policy');

  let mockFormBody: RequestBody = {
    _csrf: '1234',
    [POLICY_CURRENCY_CODE]: 'Example',
  };

  const mockValidationErrors = generateValidationErrors(mockFormBody);

  const mockSavePolicyData = mockSpyPromise();

  save.policy = mockSavePolicyData;

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.policy with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.policy(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.policy).toHaveBeenCalledTimes(1);
        expect(save.policy).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody, mockApplication), mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.policy(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      it('should call save.policy with application and populated submitted data', async () => {
        await mapAndSave.policy(mockFormBody, mockApplication);

        expect(save.policy).toHaveBeenCalledTimes(1);
        expect(save.policy).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody, mockApplication));
      });

      it('should return true', async () => {
        const result = await mapAndSave.policy(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.policy(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
