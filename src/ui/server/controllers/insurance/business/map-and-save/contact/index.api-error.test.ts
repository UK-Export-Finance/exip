import mapAndSave from '.';
import save from '../../save-data/contact';
import { mockApplication, mockBusiness } from '../../../../../test-mocks';

describe('controllers/insurance/business/map-and-save/contact - API error', () => {
  jest.mock('../../save-data/contact');

  const { id, ...mockBusinessBody } = mockBusiness.businessContactDetail;

  const mockFormBody = {
    _csrf: '1234',
    ...mockBusinessBody,
  };

  const mockSaveContact = jest.fn(() => Promise.resolve({}));
  save.contact = mockSaveContact;

  describe('when save application contact call does not return anything', () => {
    beforeEach(() => {
      save.contact = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.contact(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application contact call fails', () => {
    beforeEach(() => {
      save.contact = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.contact(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
