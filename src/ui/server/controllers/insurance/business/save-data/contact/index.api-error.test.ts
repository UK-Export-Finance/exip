import save from '.';
import api from '../../../../../api';
import { mockApplication, mockBusiness } from '../../../../../test-mocks';

describe('controllers/insurance/business/save-data/contact - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const { id, ...mockBusinessBody } = mockBusiness.businessContactDetail;

  const mockFormBody = mockBusinessBody;

  beforeEach(() => {
    api.keystone.application.update.businessContact = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.businessContact = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.contact(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error('Updating business contact');
        expect(err).toEqual(expected);
      }
    });
  });
});
