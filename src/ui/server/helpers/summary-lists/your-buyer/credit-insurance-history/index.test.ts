import creditInsuranceHistoryFields, { optionalFields } from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import { mockApplicationBuyer, referenceNumber } from '../../../../test-mocks/mock-application';

const {
  YOUR_BUYER: { CREDIT_INSURANCE_HISTORY: FORM_TITLE },
} = FORM_TITLES;

const {
  YOUR_BUYER: { CREDIT_INSURANCE_COVER_CHANGE, CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/credit-insurance-history-fields', () => {
  const mockAnswers = mockApplicationBuyer.relationship;
  const checkAndChange = false;

  describe('optionalFields', () => {
    describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is true`, () => {
      it(`should return fields and values from the submitted data/answers including ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
        const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(FIELDS, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER),
            data: mockAnswers,
            href: generateChangeLink(
              CREDIT_INSURANCE_COVER_CHANGE,
              CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE,
              `#${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          }),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is false`, () => {
      it(`should return fields and values from the submitted data/answers, not including ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
        mockAnswers[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = false;
        const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });

  describe('creditInsuranceHistoryFields', () => {
    const expectedBase = [
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER),
          data: mockAnswers,
          href: generateChangeLink(
            CREDIT_INSURANCE_COVER_CHANGE,
            CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE,
            `#${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        mapYesNoField(mockAnswers[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
      ),
      ...optionalFields(mockAnswers, referenceNumber, checkAndChange),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      mockAnswers[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = true;

      const result = creditInsuranceHistoryFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = {
        title: FORM_TITLE,
        fields: expectedBase,
      };

      expect(result).toEqual(expected);
    });
  });
});
