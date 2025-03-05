import mapOrdnanceSurveyAddresses from '.';
import POLICY_FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import isChecked from './is-checked';
import { mockOrdnanceSurveyAddressResponse, mockApplication } from '../../../test-mocks';

const { SELECT_THE_ADDRESS: FIELD_ID } = POLICY_FIELD_IDS.BROKER_ADDRESSES;

const { addresses: mockAddresses } = mockOrdnanceSurveyAddressResponse;

describe('helpers/mappings/map-ordnance-survey-addresses', () => {
  it('should return an array of mapped addresses', () => {
    const result = mapOrdnanceSurveyAddresses(mockAddresses, mockApplication.broker);

    const expected = mockAddresses.map((address, index) => {
      const expectedString = `${address.addressLine1} ${address.addressLine2}`;

      return {
        text: expectedString,
        value: String(index),
        label: {
          attributes: {
            'data-cy': `${FIELD_ID}-${expectedString}-label`,
          },
        },
        attributes: {
          'data-cy': `${FIELD_ID}-${expectedString}-input`,
        },
        checked: isChecked(address, mockApplication.broker),
      };
    });

    expect(result).toEqual(expected);
  });
});
