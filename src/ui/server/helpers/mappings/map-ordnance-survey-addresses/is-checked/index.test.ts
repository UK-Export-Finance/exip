import isChecked from '.';
import { mockApplication } from '../../../../test-mocks';

const mockAddress = {
  addressLine1: 'Line 1',
  addressLine2: 'Line 2',
  town: 'Town',
  postcode: 'Postcode',
};

const mockInitBroker = {
  ...mockApplication.broker,
  ...mockAddress,
};

describe('helpers/mappings/map-ordnance-survey-addresses/is-checked', () => {
  describe('when all address fields match', () => {
    it('should return true', () => {
      const result = isChecked(mockAddress, mockInitBroker);

      expect(result).toEqual(true);
    });
  });

  describe('when addressLine1 does NOT match', () => {
    it('should return false', () => {
      const mockBroker = {
        ...mockInitBroker,
        addressLine1: 'Different address line 1',
      };

      const result = isChecked(mockAddress, mockBroker);

      expect(result).toEqual(false);
    });
  });

  describe('when addressLine2 does NOT match', () => {
    it('should return false', () => {
      const mockBroker = {
        ...mockInitBroker,
        addressLine2: 'Different address line 2',
      };

      const result = isChecked(mockAddress, mockBroker);

      expect(result).toEqual(false);
    });
  });

  describe('when town does NOT match', () => {
    it('should return false', () => {
      const mockBroker = {
        ...mockInitBroker,
        town: 'Different town',
      };

      const result = isChecked(mockAddress, mockBroker);

      expect(result).toEqual(false);
    });
  });

  describe('when postcode does NOT match', () => {
    it('should return false', () => {
      const mockBroker = {
        ...mockInitBroker,
        postcode: 'Different postcode',
      };

      const result = isChecked(mockAddress, mockBroker);

      expect(result).toEqual(false);
    });
  });
});
