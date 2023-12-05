import { generateBrokerFields, optionalBrokerFields } from '.';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockBroker } from '../../../../test-mocks/mock-application';

const {
  POLICY: {
    BROKER: { USING_BROKER, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { BROKER_CHANGE, BROKER_CHECK_AND_CHANGE },
  },
} = ROUTES;

describe('server/helpers/summary-lists/policy/broker-fields', () => {
  describe('generateBrokerFields', () => {
    const { referenceNumber } = mockApplication;
    const checkAndChange = false;

    const expectedBase = [
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

    it('should return fields and values from the submitted data/answers', () => {
      mockBroker[USING_BROKER] = true;

      const result = generateBrokerFields(mockBroker, referenceNumber, checkAndChange);

      expect(result).toEqual(expectedBase);
    });
  });

  describe('optionalBrokerFields', () => {
    const { referenceNumber } = mockApplication;
    const checkAndChange = false;

    const mockAddress = {
      [ADDRESS_LINE_1]: mockBroker[ADDRESS_LINE_1],
      [ADDRESS_LINE_2]: mockBroker[ADDRESS_LINE_2],
      [TOWN]: mockBroker[TOWN],
      [COUNTY]: mockBroker[COUNTY],
      [POSTCODE]: mockBroker[POSTCODE],
    };

    describe(`${USING_BROKER} is Yes`, () => {
      const expectedBase = [
        fieldGroupItem({
          field: getFieldById(POLICY_FIELDS.BROKER, NAME),
          data: mockBroker,
          href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        }),
        fieldGroupItem(
          {
            field: getFieldById(POLICY_FIELDS.BROKER, ADDRESS_LINE_1),
            data: mockBroker,
            href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${ADDRESS_LINE_1}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          generateMultipleFieldHtml(mockAddress),
        ),
        fieldGroupItem({
          field: getFieldById(POLICY_FIELDS.BROKER, EMAIL),
          data: mockBroker,
          href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        }),
      ];

      it('should return array with optional fields', () => {
        mockBroker[USING_BROKER] = true;

        const result = optionalBrokerFields(mockBroker, referenceNumber, checkAndChange);

        expect(result).toEqual(expectedBase);
      });
    });

    describe(`${USING_BROKER} is false`, () => {
      it('should return array with optional fields', () => {
        mockBroker[USING_BROKER] = false;

        const result = optionalBrokerFields(mockBroker, referenceNumber, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });
});
