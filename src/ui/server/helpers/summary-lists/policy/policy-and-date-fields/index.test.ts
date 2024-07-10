import generatePolicyAndDateFields from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import changeLink from '../change-link';
import generatePreCreditPeriodFields from './pre-credit-period-fields';
import generateSingleContractPolicyFields from './single-contract-policy-fields';
import generateMultipleContractPolicyFields from './multiple-contract-policy-fields';
import getCurrencyByCode from '../../../get-currency-by-code';
import { mockApplication, mockApplicationMultiplePolicy, mockCurrencies, referenceNumber } from '../../../../test-mocks';
import { ApplicationPolicy } from '../../../../../types';

const {
  POLICY: { CONTRACT_POLICY: FORM_TITLE },
} = FORM_TITLES;

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    CONTRACT_POLICY: { REQUESTED_START_DATE, POLICY_CURRENCY_CODE },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE_ROOT,
  POLICY: { TYPE_OF_POLICY_CHANGE },
} = INSURANCE_ROUTES;

describe('server/helpers/summary-lists/policy/policy-and-date-fields', () => {
  const mockAnswers = mockApplication.policy;
  const checkAndChange = false;

  const initialExpectedFields = (answers: ApplicationPolicy) => [
    fieldGroupItem({
      field: getFieldById(FIELDS, POLICY_TYPE),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`,
      renderChangeLink: true,
    }),
    ...generatePreCreditPeriodFields(answers, referenceNumber, checkAndChange),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY, REQUESTED_START_DATE),
        ...changeLink(answers[POLICY_TYPE], referenceNumber, REQUESTED_START_DATE, checkAndChange),
      },
      formatDate(answers[REQUESTED_START_DATE]),
    ),
  ];

  const expectedCurrencyField = (answers: ApplicationPolicy) =>
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY, CURRENCY_CODE),
        data: answers,
        ...changeLink(answers[POLICY_TYPE], referenceNumber, CURRENCY_CODE, checkAndChange),
      },
      answers[POLICY_CURRENCY_CODE] && getCurrencyByCode(mockCurrencies, answers[POLICY_CURRENCY_CODE]).name,
    );

  describe('when the policy type is single policy type', () => {
    it('should return a title and fields from the submitted data/answers', () => {
      const result = generatePolicyAndDateFields(mockAnswers, referenceNumber, mockCurrencies, checkAndChange);

      const expectedFields = [
        ...initialExpectedFields(mockAnswers),
        ...generateSingleContractPolicyFields(mockAnswers, referenceNumber, checkAndChange),
        expectedCurrencyField(mockAnswers),
      ];

      const expected = {
        title: FORM_TITLE,
        fields: expectedFields,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy type is multiple policy type', () => {
    it('should return a title and fields from the submitted data/answers', () => {
      const mockAnswersMultiplePolicy = mockApplicationMultiplePolicy.policy;

      const result = generatePolicyAndDateFields(mockAnswersMultiplePolicy, referenceNumber, mockCurrencies, checkAndChange);

      const expectedFields = [
        ...initialExpectedFields(mockAnswersMultiplePolicy),
        ...generateMultipleContractPolicyFields(mockAnswersMultiplePolicy, referenceNumber, checkAndChange),
        expectedCurrencyField(mockAnswersMultiplePolicy),
      ];

      const expected = {
        title: FORM_TITLE,
        fields: expectedFields,
      };

      expect(result).toEqual(expected);
    });
  });
});
