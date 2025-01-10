import getChosenOrdnanceSurveyAddress from '.';
import { mockOrdnanceSurveyAddressResponse } from '../../test-mocks';

const mockAddresses = mockOrdnanceSurveyAddressResponse.addresses;

const mockFieldId = 'mockField';

describe('helpers/get-chosen-ordnance-survey-address', () => {
  describe('when an address is found', () => {
    const mockPayload = {
      [mockFieldId]: '0',
    };

    it('should return an address without __typename', () => {
      const result = getChosenOrdnanceSurveyAddress(mockPayload, mockFieldId, mockAddresses);

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

  describe('when the provided field ID is not in the payload', () => {
    const mockPayload = {
      [mockFieldId]: '0',
    };

    it('should return an empty object', () => {
      const result = getChosenOrdnanceSurveyAddress(mockPayload, 'other-field-id', mockAddresses);

      expect(result).toEqual({});
    });
  });

  describe('when the an address is not found via the payload field ID', () => {
    const mockPayload = {
      [mockFieldId]: '100',
    };

    it('should return an empty object', () => {
      const result = getChosenOrdnanceSurveyAddress(mockPayload, mockFieldId, mockAddresses);

      expect(result).toEqual({});
    });
  });
});
