import mapAndSave from '.';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import save from '../../save-data/policy-contact';
import { mockApplication } from '../../../../../test-mocks';

const {
  NAME_ON_POLICY: { NAME, SAME_NAME },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/policy-contact', () => {
  jest.mock('../../save-data/policy-contact');

  const mockFormBody = {
    [NAME]: SAME_NAME,
  };

  const mockSavePolicyContactData = jest.fn(() => Promise.resolve({}));

  save.policyContact = mockSavePolicyContactData;

  describe('when save application policy call does not return anything', () => {
    beforeEach(() => {
      save.policyContact = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.policyContact(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application policy call fails', () => {
    beforeEach(() => {
      save.policyContact = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.policyContact(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
