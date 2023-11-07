import { generateBrokerFields, optionalBrokerFields } from '.';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockBroker } from '../../../../test-mocks/mock-application';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { BROKER_CHANGE, BROKER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  BROKER: { USING_BROKER, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL },
} = FIELD_IDS;

describe('server/helpers/summary-lists/your-business/broker-fields', () => {
  describe('generateBrokerFields', () => {
    const mockAnswers = mockBroker;
    const { referenceNumber } = mockApplication;
    const checkAndChange = false;

    const expectedBase = [
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.BROKER, USING_BROKER),
          data: mockAnswers,
          href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${USING_BROKER}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        },
        mapYesNoField(mockAnswers[USING_BROKER]),
      ),
      ...optionalBrokerFields(mockAnswers, referenceNumber, checkAndChange),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      mockAnswers[USING_BROKER] = true;

      const result = generateBrokerFields(mockAnswers, referenceNumber, checkAndChange);

      expect(result).toEqual(expectedBase);
    });
  });

  describe('optionalBrokerFields', () => {
    const mockAnswers = mockBroker;
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
          field: getFieldById(FIELDS.BROKER, NAME),
          data: mockAnswers,
          href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        }),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.BROKER, ADDRESS_LINE_1),
            data: mockAnswers,
            href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${ADDRESS_LINE_1}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          generateMultipleFieldHtml(mockAddress),
        ),
        fieldGroupItem({
          field: getFieldById(FIELDS.BROKER, EMAIL),
          data: mockAnswers,
          href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        }),
      ];

      it('should return array with optional fields', () => {
        mockAnswers[USING_BROKER] = true;

        const result = optionalBrokerFields(mockAnswers, referenceNumber, checkAndChange);

        expect(result).toEqual(expectedBase);
      });
    });

    describe(`${USING_BROKER} is false`, () => {
      it('should return array with optional fields', () => {
        mockAnswers[USING_BROKER] = false;

        const result = optionalBrokerFields(mockAnswers, referenceNumber, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });
});
