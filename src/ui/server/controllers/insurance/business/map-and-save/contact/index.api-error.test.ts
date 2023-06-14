import contact from '.';
import contactSave from '../../save-data/contact';
import { mockApplication, mockBusiness } from '../../../../../test-mocks';

describe('controllers/insurance/business/map-and-save/contact - API error', () => {
  jest.mock('../../save-data/contact');

  const { id, ...mockBusinessBody } = mockBusiness.businessContactDetail;

  const mockFormBody = {
    _csrf: '1234',
    ...mockBusinessBody,
  };

  const mockSaveContact = jest.fn(() => Promise.resolve({}));
  contactSave.save = mockSaveContact;

  describe('when save application contact call does not return anything', () => {
    beforeEach(() => {
      contactSave.save = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await contact.mapAndSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application contact call fails', () => {
    beforeEach(() => {
      contactSave.save = jest.fn(() => Promise.reject(new Error('Mock error')));
    });

    it('should return false', async () => {
      const result = await contact.mapAndSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
