import save from '.';
import api from '../../../../../api';
import { mockApplication, mockJointlyInsuredParty } from '../../../../../test-mocks';

describe('controllers/insurance/policy/save-data/jointly-insured-policy - API error', () => {
  const mockFormBody = mockJointlyInsuredParty;

  beforeEach(() => {
    const updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
    api.keystone.application.update.jointlyInsuredParty = updateApplicationSpy;
  });

  it('should throw an error', async () => {
    try {
      await save.jointlyInsuredParty(mockApplication, mockFormBody);
    } catch (err) {
      const expected = new Error("Updating application's jointly insured party");
      expect(err).toEqual(expected);
    }
  });
});
