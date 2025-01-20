import getOrdnanceSurveyAddressByIndex from '.';
import { mockOrdnanceSurveyAddressResponse } from '../../../test-mocks';

const mockAddresses = mockOrdnanceSurveyAddressResponse.addresses;

describe('helpers/get-chosen-ordnance-survey-address/by-index', () => {
  describe('when an index is provided and an address is found', () => {
    it('should return an address without __typename', () => {
      const result = getOrdnanceSurveyAddressByIndex({ addresses: mockAddresses, index: 1 });

      const { 1: secondAddress } = mockAddresses;

      const { addressLine1, addressLine2, town, postalCode } = secondAddress;

      const expected = {
        addressLine1,
        addressLine2,
        town,
        postalCode,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when an index is provided and an address is NOT found', () => {
    it('should return an empty object', () => {
      const result = getOrdnanceSurveyAddressByIndex({ addresses: mockAddresses, index: 100 });

      expect(result).toEqual({});
    });
  });

  describe('when an index is NOT provided and an address is found with the default index', () => {
    it('should return an address without __typename', () => {
      const result = getOrdnanceSurveyAddressByIndex({ addresses: mockAddresses });

      const [firstAddress] = mockAddresses;

      const { addressLine1, addressLine2, town, postalCode } = firstAddress;

      const expected = {
        addressLine1,
        addressLine2,
        town,
        postalCode,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the an address is not found with the default index', () => {
    it('should return an empty object', () => {
      const result = getOrdnanceSurveyAddressByIndex({ addresses: [] });

      expect(result).toEqual({});
    });
  });
});
