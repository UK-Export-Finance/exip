import mapAndSave from '.';
import mapSubmittedData from '../../map-submitted-data/jointly-insured-party';
import save from '../../save-data/jointly-insured-party';
import { mockApplication, mockJointlyInsuredParty } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/jointly-insured-party', () => {
  jest.mock('../../save-data/jointly-insured-party');

  const mockFormBody = {
    _csrf: '1234',
    [REQUESTED]: mockJointlyInsuredParty[REQUESTED],
  };

  const mockSaveBroker = jest.fn(() => Promise.resolve({}));
  save.jointlyInsuredParty = mockSaveBroker;

  const mockValidationErrors = generateValidationErrors(REQUESTED, 'error', {});

  const populatedData = mapSubmittedData(mockFormBody);

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.jointlyInsuredParty with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.jointlyInsuredParty(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.jointlyInsuredParty).toHaveBeenCalledTimes(1);
        expect(save.jointlyInsuredParty).toHaveBeenCalledWith(mockApplication, populatedData, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.jointlyInsuredParty(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.jointlyInsuredParty with application and populated submitted data', async () => {
        await mapAndSave.jointlyInsuredParty(mockFormBody, mockApplication);

        expect(save.jointlyInsuredParty).toHaveBeenCalledTimes(1);
        expect(save.jointlyInsuredParty).toHaveBeenCalledWith(mockApplication, populatedData);
      });

      it('should return true', async () => {
        const result = await mapAndSave.jointlyInsuredParty(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      const emptyMockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.jointlyInsuredParty(emptyMockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
