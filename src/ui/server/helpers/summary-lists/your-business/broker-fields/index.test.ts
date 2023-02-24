import { generateBrokerFields, optionalBrokerFields } from '.';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import { generateAddressHTML } from '../../company-house-summary-list';
import mockApplication, { mockExporterBroker } from '../../../../test-mocks/mock-application';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    EXPORTER_BUSINESS: { BROKER_CHANGE },
  },
} = ROUTES;

const {
  BROKER: { USING_BROKER, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL },
} = FIELD_IDS;

describe('server/helpers/summary-lists/your-business/broker-fields', () => {
  describe('generateBrokerFields', () => {
    const mockAnswers = mockExporterBroker;
    const { referenceNumber } = mockApplication;

    const expectedBase = [
      fieldGroupItem({
        field: getFieldById(FIELDS.BROKER, USING_BROKER),
        data: mockAnswers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CHANGE}#${USING_BROKER}-label`,
        renderChangeLink: true,
      }),
      ...optionalBrokerFields(mockAnswers, referenceNumber),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      mockAnswers[USING_BROKER] = 'Yes';

      const result = generateBrokerFields(mockAnswers, referenceNumber);

      expect(result).toEqual(expectedBase);
    });
  });

  describe('optionalBrokerFields', () => {
    const mockAnswers = mockExporterBroker;
    const { referenceNumber } = mockApplication;

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
          href: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CHANGE}#${NAME}-label`,
          renderChangeLink: true,
        }),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.BROKER, ADDRESS_LINE_1),
            data: mockAnswers,
            href: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CHANGE}#${ADDRESS_LINE_1}-label`,
            renderChangeLink: true,
          },
          generateAddressHTML(mockAddress),
        ),
        fieldGroupItem({
          field: getFieldById(FIELDS.BROKER, EMAIL),
          data: mockAnswers,
          href: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CHANGE}#${EMAIL}-label`,
          renderChangeLink: true,
        }),
      ];

      it('should return array with optional fields', () => {
        mockAnswers[USING_BROKER] = 'Yes';

        const result = optionalBrokerFields(mockAnswers, referenceNumber);

        expect(result).toEqual(expectedBase);
      });
    });

    describe(`${USING_BROKER} is no`, () => {
      it('should return array with optional fields', () => {
        mockAnswers[USING_BROKER] = 'No';

        const result = optionalBrokerFields(mockAnswers, referenceNumber);

        expect(result).toEqual([]);
      });
    });
  });
});
