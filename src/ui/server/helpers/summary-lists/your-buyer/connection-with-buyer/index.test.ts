import connectionWithBuyerFields, { optionalFields } from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import { mockApplicationBuyer, referenceNumber } from '../../../../test-mocks/mock-application';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  YOUR_BUYER: { CONNECTION_TO_BUYER: FORM_TITLE },
} = FORM_TITLES;

const {
  INSURANCE: {
    YOUR_BUYER: { CONNECTION_WITH_BUYER_CHANGE, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/connection-with-buyer-fields', () => {
  const mockAnswers = mockApplicationBuyer.relationship;
  const checkAndChange = false;

  describe('optionalFields', () => {
    describe(`when ${CONNECTION_WITH_BUYER} is true`, () => {
      it(`should return fields and values from the submitted data/answers including ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
        const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(FIELDS, CONNECTION_WITH_BUYER_DESCRIPTION),
            data: mockAnswers,
            href: generateChangeLink(
              CONNECTION_WITH_BUYER_CHANGE,
              CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
              `#${CONNECTION_WITH_BUYER_DESCRIPTION}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          }),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${CONNECTION_WITH_BUYER} is false`, () => {
      it(`should return fields and values from the submitted data/answers, not including ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
        mockAnswers[CONNECTION_WITH_BUYER] = false;
        const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });

  describe('connectionWithBuyerFields', () => {
    const expectedBase = [
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, CONNECTION_WITH_BUYER),
          data: mockAnswers,
          href: generateChangeLink(
            CONNECTION_WITH_BUYER_CHANGE,
            CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
            `#${CONNECTION_WITH_BUYER}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        mapYesNoField(mockAnswers[CONNECTION_WITH_BUYER]),
      ),
      ...optionalFields(mockAnswers, referenceNumber, checkAndChange),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      mockAnswers[CONNECTION_WITH_BUYER] = true;

      const result = connectionWithBuyerFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = {
        title: FORM_TITLE,
        fields: expectedBase,
      };

      expect(result).toEqual(expected);
    });
  });
});
