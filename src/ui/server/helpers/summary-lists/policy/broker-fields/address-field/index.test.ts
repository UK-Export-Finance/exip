import brokerAddressField from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { POLICY as POLICY_ROUTES } from '../../../../../constants/routes/insurance/policy';
import { POLICY_FIELDS } from '../../../../../content-strings/fields/insurance';
import fieldGroupItem from '../../../generate-field-group-item';
import getFieldById from '../../../../get-field-by-id';
import generateChangeLink from '../../../../generate-change-link';
import generateMultipleFieldHtml from '../../../../generate-multiple-field-html';
import { mockBroker, referenceNumber } from '../../../../../test-mocks/mock-application';

const {
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const { BROKER_CONFIRM_ADDRESS_CHANGE, BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE } = POLICY_ROUTES;

const checkAndChange = false;

const { addressLine1, addressLine2, town, county, postcode } = mockBroker;

describe('server/helpers/summary-lists/policy/broker-fields/address-field', () => {
  describe(`when ${FULL_ADDRESS} is a populated string`, () => {
    it(`should return an ${FULL_ADDRESS} field`, () => {
      const mockAnswers = {
        ...mockBroker,
        [FULL_ADDRESS]: 'Mock broker full address',
      };

      const result = brokerAddressField(mockAnswers, referenceNumber, checkAndChange);

      const expected = fieldGroupItem(
        {
          field: getFieldById(POLICY_FIELDS.BROKER_MANUAL_ADDRESS, FULL_ADDRESS),
          data: mockAnswers,
          href: generateChangeLink(
            BROKER_CONFIRM_ADDRESS_CHANGE,
            BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE,
            `#${FULL_ADDRESS}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        mockAnswers[FULL_ADDRESS],
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FULL_ADDRESS} is an empty string`, () => {
    it(`should return a ${SELECT_THE_ADDRESS} field with a value via generateMultipleFieldHtml`, () => {
      const mockAnswers = {
        ...mockBroker,
        [FULL_ADDRESS]: '',
      };

      const result = brokerAddressField(mockAnswers, referenceNumber, checkAndChange);

      const expected = fieldGroupItem(
        {
          field: getFieldById(POLICY_FIELDS.BROKER_ADDRESSES, SELECT_THE_ADDRESS),
          data: mockAnswers,
          href: generateChangeLink(
            BROKER_CONFIRM_ADDRESS_CHANGE,
            BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE,
            `#${SELECT_THE_ADDRESS}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        generateMultipleFieldHtml({
          addressLine1,
          addressLine2,
          town,
          county,
          postcode,
        }),
      );

      expect(result).toEqual(expected);
    });
  });
});
