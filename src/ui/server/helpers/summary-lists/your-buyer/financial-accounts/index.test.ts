import financialAccountsFields from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockApplicationBuyer } from '../../../../test-mocks/mock-application';

const {
  YOUR_BUYER: { FINANCIAL_ACCOUNTS: FORM_TITLE },
} = FORM_TITLES;

const {
  INSURANCE: {
    YOUR_BUYER: { BUYER_FINANCIAL_INFORMATION_CHANGE, BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE },
  },
} = ROUTES;

const { HAS_BUYER_FINANCIAL_ACCOUNTS } = YOUR_BUYER_FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/financial-accounts-fields', () => {
  const mockAnswers = mockApplicationBuyer.relationship;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  describe('creditInsuranceHistoryFields', () => {
    const expectedBase = [
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, HAS_BUYER_FINANCIAL_ACCOUNTS),
          data: mockAnswers,
          href: generateChangeLink(
            BUYER_FINANCIAL_INFORMATION_CHANGE,
            BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE,
            `#${HAS_BUYER_FINANCIAL_ACCOUNTS}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        mapYesNoField(mockAnswers[HAS_BUYER_FINANCIAL_ACCOUNTS]),
      ),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      mockAnswers[HAS_BUYER_FINANCIAL_ACCOUNTS] = true;

      const result = financialAccountsFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = {
        title: FORM_TITLE,
        fields: expectedBase,
      };

      expect(result).toEqual(expected);
    });
  });
});
