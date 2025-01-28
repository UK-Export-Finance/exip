import save from '.';
import api from '../../../../../api';
import { mockApplication, mockSpyPromiseRejection } from '../../../../../test-mocks';

describe('controllers/insurance/declarations/save-data/modern-slavery - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = {};

  beforeEach(() => {
    api.keystone.application.update.declarationModernSlavery = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = mockSpyPromiseRejection;
      api.keystone.application.update.declarationModernSlavery = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.declarationModernSlavery(mockApplication, mockFormBody);
      } catch (error) {
        const expected = new Error("Updating application's declaration modern slavery");
        expect(error).toEqual(expected);
      }
    });
  });
});
