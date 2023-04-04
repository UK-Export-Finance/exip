import { checkYourAnswersPage } from '../../e2e/pages/insurance/policy-and-export';
import { FIELD_IDS, FIELD_VALUES } from '../../../constants';
import { LINKS } from '../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../content-strings/fields/insurance/policy-and-exports';
import application from '../../fixtures/application';
import countries from '../../fixtures/countries';
import currencies from '../../fixtures/currencies';
import formatCurrency from '../../e2e/helpers/format-currency';
import { createTimestampFromNumbers, formatDate } from '../../e2e/helpers/date';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
        MULTIPLE: {
          TOTAL_MONTHS_OF_COVER,
          TOTAL_SALES_TO_BUYER,
          MAXIMUM_BUYER_WILL_OWE,
        },
      },
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const assertRow = (fieldId, expectedKey, expectedValue, expectedChangeLinkText) => {
  const { summaryList } = checkYourAnswersPage;
  const row = summaryList[fieldId];

  cy.checkText(
    row.key(),
    expectedKey,
  );

  cy.checkText(
    row.value(),
    expectedValue,
  );

  cy.checkText(
    row.changeLink(),
    `${LINKS.CHANGE} ${expectedChangeLinkText}`,
  );
};

const checkPolicyAndExportsSummaryList = ({
  [REQUESTED_START_DATE]: () => {
    const fieldId = REQUESTED_START_DATE;
    const expectedKey = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    const { day, month, year } = application.POLICY_AND_EXPORTS[fieldId];
    const timestamp = createTimestampFromNumbers(day, month, year);
    const expectedValue = formatDate(timestamp);

    const expectedChangeLinkText = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [CREDIT_PERIOD_WITH_BUYER]: () => {
    const fieldId = CREDIT_PERIOD_WITH_BUYER;
    const expectedKey = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;
    const expectedValue = application.POLICY_AND_EXPORTS[fieldId];

    const expectedChangeLinkText = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [POLICY_CURRENCY_CODE]: () => {
    const fieldId = POLICY_CURRENCY_CODE;
    const expectedKey = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    const currency = currencies.find((c) => c.isoCode === application.POLICY_AND_EXPORTS[fieldId]);

    const expectedValue = currency.name;

    const expectedChangeLinkText = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [DESCRIPTION]: () => {
    const fieldId = DESCRIPTION;
    const expectedKey = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    const expectedValue = application.POLICY_AND_EXPORTS[fieldId];

    const expectedChangeLinkText = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [FINAL_DESTINATION]: () => {
    const fieldId = FINAL_DESTINATION;
    const expectedKey = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    const country = countries.find((c) => c.isoCode === application.POLICY_AND_EXPORTS[fieldId]);

    const expectedValue = country.name;

    const expectedChangeLinkText = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  singleContractPolicy: {
    [POLICY_TYPE]: () => {
      const fieldId = POLICY_TYPE;
      const expectedKey = FIELDS[fieldId].SUMMARY.TITLE;
      const expectedValue = FIELD_VALUES.POLICY_TYPE.SINGLE;

      const expectedChangeLinkText = FIELDS[fieldId].SUMMARY.TITLE;

      assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [CONTRACT_COMPLETION_DATE]: () => {
      const fieldId = CONTRACT_COMPLETION_DATE;

      const expectedKey = FIELDS.CONTRACT_POLICY.SINGLE[fieldId].SUMMARY.TITLE;

      const { day, month, year } = application.POLICY_AND_EXPORTS[fieldId];
      const timestamp = createTimestampFromNumbers(day, month, year);
      const expectedValue = formatDate(timestamp);

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.SINGLE[fieldId].SUMMARY.TITLE;

      assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [TOTAL_CONTRACT_VALUE]: () => {
      const fieldId = TOTAL_CONTRACT_VALUE;
      const expectedKey = FIELDS.CONTRACT_POLICY.SINGLE[fieldId].SUMMARY.TITLE;
      const expectedValue = formatCurrency(application.POLICY_AND_EXPORTS[fieldId]);

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.SINGLE[fieldId].SUMMARY.TITLE;

      assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
  },
  multipleContractPolicy: {
    [POLICY_TYPE]: () => {
      const fieldId = POLICY_TYPE;
      const expectedKey = FIELDS[fieldId].SUMMARY.TITLE;
      const expectedValue = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

      const expectedChangeLinkText = FIELDS[fieldId].SUMMARY.TITLE;

      assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [TOTAL_MONTHS_OF_COVER]: () => {
      const fieldId = TOTAL_MONTHS_OF_COVER;
      const expectedKey = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      const expectedValue = `${application.POLICY_AND_EXPORTS[fieldId]} months`;

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [TOTAL_SALES_TO_BUYER]: () => {
      const fieldId = TOTAL_SALES_TO_BUYER;
      const expectedKey = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      const expectedValue = formatCurrency(application.POLICY_AND_EXPORTS[fieldId]);

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [MAXIMUM_BUYER_WILL_OWE]: () => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;
      const expectedKey = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      const expectedValue = formatCurrency(application.POLICY_AND_EXPORTS[fieldId]);

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
  },
});

export default checkPolicyAndExportsSummaryList;
