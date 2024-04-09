import generatePreCreditPeriodFields from '.';
import { POLICY_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import fieldGroupItem from '../../../generate-field-group-item';
import getFieldById from '../../../../get-field-by-id';
import generateChangeLink from '../../../../generate-change-link';
import mapYesNoField from '../../../../mappings/map-yes-no-field';
import { referenceNumber, mockSinglePolicy } from '../../../../../test-mocks/mock-application';
import { ApplicationPolicy } from '../../../../../../types';

const { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

const {
  POLICY: { PRE_CREDIT_PERIOD_CHANGE, PRE_CREDIT_PERIOD_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const checkAndChange = true;

const expectedNeedPreCreditPeriodField = (answers: ApplicationPolicy) =>
  fieldGroupItem(
    {
      field: getFieldById(FIELDS, NEED_PRE_CREDIT_PERIOD),
      href: generateChangeLink(
        PRE_CREDIT_PERIOD_CHANGE,
        PRE_CREDIT_PERIOD_CHECK_AND_CHANGE,
        `#${NEED_PRE_CREDIT_PERIOD}-label`,
        referenceNumber,
        checkAndChange,
      ),
      renderChangeLink: true,
    },
    mapYesNoField(answers[NEED_PRE_CREDIT_PERIOD]),
  );

describe('server/helpers/summary-lists/policy/policy-and-date-fields/pre-credit-period-fields', () => {
  describe(`when ${NEED_PRE_CREDIT_PERIOD} is true`, () => {
    it(`should return ${NEED_PRE_CREDIT_PERIOD} and ${CREDIT_PERIOD_WITH_BUYER} fields`, () => {
      const mockAnswers = {
        ...mockSinglePolicy,
        [NEED_PRE_CREDIT_PERIOD]: true,
      };

      const result = generatePreCreditPeriodFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = [
        expectedNeedPreCreditPeriodField(mockAnswers),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS, CREDIT_PERIOD_WITH_BUYER),
            href: generateChangeLink(
              PRE_CREDIT_PERIOD_CHANGE,
              PRE_CREDIT_PERIOD_CHECK_AND_CHANGE,
              `#${CREDIT_PERIOD_WITH_BUYER}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          },
          mockAnswers[CREDIT_PERIOD_WITH_BUYER],
        ),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is false`, () => {
    it(`should return only the ${NEED_PRE_CREDIT_PERIOD} field`, () => {
      const mockAnswers = {
        ...mockSinglePolicy,
        [NEED_PRE_CREDIT_PERIOD]: false,
      };

      const result = generatePreCreditPeriodFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = [expectedNeedPreCreditPeriodField(mockAnswers)];

      expect(result).toEqual(expected);
    });
  });
});
