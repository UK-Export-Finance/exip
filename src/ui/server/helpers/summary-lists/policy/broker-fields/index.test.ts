import { generateBrokerFields } from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockBroker } from '../../../../test-mocks/mock-application';

const {
  POLICY: { BROKER: FORM_TITLE },
} = FORM_TITLES;

const {
  POLICY: {
    BROKER: { USING_BROKER },
  },
} = INSURANCE_FIELD_IDS;

const {
  POLICY: { BROKER_CHANGE, BROKER_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

describe('server/helpers/summary-lists/policy/broker-fields', () => {
  // TODO: EMS-2793 - re-enable
  // describe('optionalBrokerFields', () => {
  //   const { referenceNumber } = mockApplication;
  //   const checkAndChange = false;

  // const mockAddress = mockBroker[FULL_ADDRESS];

  // describe(`${USING_BROKER} is Yes`, () => {
  //   it('should return fields from the submitted data/answers', () => {
  //     mockBroker[USING_BROKER] = true;

  //     const result = optionalBrokerFields(mockBroker, referenceNumber, checkAndChange);

  //     const expected = [
  //       fieldGroupItem({
  //         field: getFieldById(POLICY_FIELDS.BROKER, NAME),
  //         data: mockBroker,
  //         href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
  //         renderChangeLink: true,
  //       }),
  //       fieldGroupItem(
  //         {
  //           field: getFieldById(POLICY_FIELDS.BROKER, ADDRESS_LINE_1),
  //           data: mockBroker,
  //           href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${ADDRESS_LINE_1}-label`, referenceNumber, checkAndChange),
  //           renderChangeLink: true,
  //         },
  //         generateMultipleFieldHtml(mockAddress),
  //       ),
  //       fieldGroupItem({
  //         field: getFieldById(POLICY_FIELDS.BROKER, EMAIL),
  //         data: mockBroker,
  //         href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
  //         renderChangeLink: true,
  //       }),
  //     ];

  //     expect(result).toEqual(expected);
  //   });
  // });

  //   describe(`${USING_BROKER} is false`, () => {
  //     it('should return an empty array', () => {
  //       mockBroker[USING_BROKER] = false;

  //       const result = optionalBrokerFields(mockBroker, referenceNumber, checkAndChange);

  //       expect(result).toEqual([]);
  //     });
  //   });
  // });

  describe('generateBrokerFields', () => {
    const { referenceNumber } = mockApplication;
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
        // ...optionalBrokerFields(mockBroker, referenceNumber, checkAndChange),
      ];

      const expected = {
        title: FORM_TITLE,
        fields: expectedFields,
      };

      expect(result).toEqual(expected);
    });
  });
});
