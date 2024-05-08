import { generateBrokerFields, optionalBrokerFields } from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { mockBroker, referenceNumber } from '../../../../test-mocks/mock-application';

const {
  POLICY: { BROKER: FORM_TITLE },
} = FORM_TITLES;

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const { EMAIL } = ACCOUNT_FIELD_IDS;

const {
  POLICY: { BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

describe('server/helpers/summary-lists/policy/broker-fields', () => {
  describe('optionalBrokerFields', () => {
    const checkAndChange = false;

    describe(`when ${USING_BROKER} is true`, () => {
      it('should return fields from the submitted data/answers', () => {
        mockBroker[USING_BROKER] = true;

        const result = optionalBrokerFields(mockBroker, referenceNumber, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(POLICY_FIELDS.BROKER_DETAILS, NAME),
            data: mockBroker,
            href: generateChangeLink(BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          }),
          fieldGroupItem(
            {
              field: getFieldById(POLICY_FIELDS.BROKER_DETAILS, FULL_ADDRESS),
              data: mockBroker,
              href: generateChangeLink(BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE, `#${FULL_ADDRESS}-label`, referenceNumber, checkAndChange),
              renderChangeLink: true,
            },
            replaceNewLineWithLineBreak(mockBroker[FULL_ADDRESS]),
          ),
          fieldGroupItem({
            field: getFieldById(POLICY_FIELDS.BROKER_DETAILS, EMAIL),
            data: mockBroker,
            href: generateChangeLink(BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          }),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${USING_BROKER} is false`, () => {
      it('should return an empty array', () => {
        mockBroker[USING_BROKER] = false;

        const result = optionalBrokerFields(mockBroker, referenceNumber, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });

  describe('generateBrokerFields', () => {
    const checkAndChange = false;

    it('should return a title and fields from the submitted data/answers', () => {
      mockBroker[USING_BROKER] = true;

      const result = generateBrokerFields(mockBroker, referenceNumber, checkAndChange);

      const expectedFields = [
        fieldGroupItem(
          {
            field: getFieldById(POLICY_FIELDS.BROKER, USING_BROKER),
            data: mockBroker,
            href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${USING_BROKER}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          mapYesNoField(mockBroker[USING_BROKER]),
        ),
        ...optionalBrokerFields(mockBroker, referenceNumber, checkAndChange),
      ];

      const expected = {
        title: FORM_TITLE,
        fields: expectedFields,
      };

      expect(result).toEqual(expected);
    });
  });
});
