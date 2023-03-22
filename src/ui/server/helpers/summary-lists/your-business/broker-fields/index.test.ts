import { generateBrokerFields, optionalBrokerFields } from '.';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mockApplication, { mockExporterBroker } from '../../../../test-mocks/mock-application';
import generateChangeLink from '../../../generate-change-link';

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
    const mockAnswers = mockExporterBroker;
    const { referenceNumber } = mockApplication;
    const checkAndChange = false;

    const expectedBase = [
      fieldGroupItem({
        field: getFieldById(FIELDS.BROKER, USING_BROKER),
        data: mockAnswers,
        href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${USING_BROKER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      }),
      ...optionalBrokerFields(mockAnswers, referenceNumber, checkAndChange),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      mockAnswers[USING_BROKER] = 'Yes';

      const result = generateBrokerFields(mockAnswers, referenceNumber, checkAndChange);

      expect(result).toEqual(expectedBase);
    });
  });

  describe('optionalBrokerFields', () => {
    const mockAnswers = mockExporterBroker;
    const { referenceNumber } = mockApplication;
    const checkAndChange = false;

    const mockAddress = {
      [ADDRESS_LINE_1]: mockExporterBroker[ADDRESS_LINE_1],
      [ADDRESS_LINE_2]: mockExporterBroker[ADDRESS_LINE_2],
      [TOWN]: mockExporterBroker[TOWN],
      [COUNTY]: mockExporterBroker[COUNTY],
      [POSTCODE]: mockExporterBroker[POSTCODE],
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
        mockAnswers[USING_BROKER] = 'Yes';

        const result = optionalBrokerFields(mockAnswers, referenceNumber, checkAndChange);

        expect(result).toEqual(expectedBase);
      });
    });

    describe(`${USING_BROKER} is no`, () => {
      it('should return array with optional fields', () => {
        mockAnswers[USING_BROKER] = 'No';

        const result = optionalBrokerFields(mockAnswers, referenceNumber, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });
});
