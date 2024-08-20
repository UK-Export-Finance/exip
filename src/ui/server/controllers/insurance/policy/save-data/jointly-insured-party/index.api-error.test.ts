import save from '.';
import api from '../../../../../api';
import { mockApplication, mockJointlyInsuredParty, mockSpyPromiseRejection } from '../../../../../test-mocks';

describe('controllers/insurance/policy/save-data/jointly-insured-policy - API error', () => {
  const mockFormBody = mockJointlyInsuredParty;

  beforeEach(() => {
    const updateApplicationSpy = mockSpyPromiseRejection;
    api.keystone.application.update.jointlyInsuredParty = updateApplicationSpy;
  });

  it('should throw an error', async () => {
    try {
      await save.jointlyInsuredParty(mockApplication, mockFormBody);
    } catch (error) {
      const expected = new Error("Updating application's jointly insured party");
      expect(error).toEqual(expected);
    }
  });
});
