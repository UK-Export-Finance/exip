import { lossPayeeLocatedInUkFields, lossPayeeFields, generateLossPayeeFields } from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { mockNominatedLossPayee, referenceNumber } from '../../../../test-mocks/mock-application';

const {
  POLICY: { LOSS_PAYEE: FORM_TITLE },
} = FORM_TITLES;

const {
  LOSS_PAYEE: { IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { NAME, IS_LOCATED_IN_UK },
  FINANCIAL_ADDRESS,
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
} = POLICY_FIELD_IDS;

const {
  POLICY: {
    LOSS_PAYEE_CHANGE,
    LOSS_PAYEE_CHECK_AND_CHANGE,
    LOSS_PAYEE_DETAILS_CHANGE,
    LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const checkAndChange = false;

describe('server/helpers/summary-lists/policy/loss-payee-fields', () => {
  describe('lossPayeeLocatedInUkFields', () => {
    it('should return fields from the submitted data/answers', () => {
      const mockAnswers = mockNominatedLossPayee.financialUk;

      const result = lossPayeeLocatedInUkFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = [
        fieldGroupItem(
          {
            field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_UK, FINANCIAL_ADDRESS),
            data: mockAnswers,
            href: generateChangeLink(
              LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
              LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
              `#${FINANCIAL_ADDRESS}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          },
          replaceNewLineWithLineBreak(mockAnswers[FINANCIAL_ADDRESS]),
        ),
        fieldGroupItem({
          field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_UK, SORT_CODE),
          data: mockAnswers,
          href: generateChangeLink(
            LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
            LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
            `#${NAME}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        }),
        fieldGroupItem({
          field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_UK, ACCOUNT_NUMBER),
          data: mockAnswers,
          href: generateChangeLink(
            LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
            LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
            `#${ACCOUNT_NUMBER}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        }),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('lossPayeeFields', () => {
    describe(`when ${IS_APPOINTED} and ${IS_LOCATED_IN_UK} are true`, () => {
      it('should return fields from the submitted data/answers', () => {
        mockNominatedLossPayee[IS_APPOINTED] = true;
        mockNominatedLossPayee[IS_LOCATED_IN_UK] = true;

        const result = lossPayeeFields(mockNominatedLossPayee, referenceNumber, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_DETAILS, NAME),
            data: mockNominatedLossPayee,
            href: generateChangeLink(LOSS_PAYEE_DETAILS_CHANGE, LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          }),
          ...lossPayeeLocatedInUkFields(mockNominatedLossPayee.financialUk, referenceNumber, checkAndChange),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${IS_APPOINTED} is true and ${IS_LOCATED_IN_UK} is false`, () => {
      it('should return fields from the submitted data/answers', () => {
        mockNominatedLossPayee[IS_APPOINTED] = true;
        mockNominatedLossPayee[IS_LOCATED_IN_UK] = false;

        const result = lossPayeeFields(mockNominatedLossPayee, referenceNumber, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_DETAILS, NAME),
            data: mockNominatedLossPayee,
            href: generateChangeLink(LOSS_PAYEE_DETAILS_CHANGE, LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          }),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${IS_APPOINTED} is false`, () => {
      it('should return an empty array', () => {
        mockNominatedLossPayee[IS_APPOINTED] = false;

        const result = lossPayeeFields(mockNominatedLossPayee, referenceNumber, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });

  describe('generateLossPayeeFields', () => {
    it('should return a title and fields from the submitted data/answers', () => {
      const result = generateLossPayeeFields(mockNominatedLossPayee, referenceNumber, checkAndChange);

      const expectedFields = [
        fieldGroupItem(
          {
            field: getFieldById(POLICY_FIELDS.LOSS_PAYEE, IS_APPOINTED),
            data: mockNominatedLossPayee,
            href: generateChangeLink(LOSS_PAYEE_CHANGE, LOSS_PAYEE_CHECK_AND_CHANGE, `#${IS_APPOINTED}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          mapYesNoField(mockNominatedLossPayee[IS_APPOINTED]),
        ),
        ...lossPayeeFields(mockNominatedLossPayee, referenceNumber, checkAndChange),
      ];

      const expected = {
        title: FORM_TITLE,
        fields: expectedFields,
      };

      expect(result).toEqual(expected);
    });
  });
});
