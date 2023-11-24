import { summaryList } from '../../pages/shared';
import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { POLICY_FIELDS as FIELDS } from '../../content-strings/fields/insurance/policy';
import account from '../../fixtures/account';
import application from '../../fixtures/application';
import COUNTRIES from '../../fixtures/countries';
import CURRENCIES from '../../fixtures/currencies';
import formatCurrency from '../../helpers/format-currency';
import { createTimestampFromNumbers, formatDate } from '../../helpers/date';

const {
  INSURANCE: {
    POLICY: {
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
      NAME_ON_POLICY: { NAME, POSITION },
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
    ACCOUNT: { EMAIL, FIRST_NAME, LAST_NAME },
  },
} = FIELD_IDS;

const { POLICY_CONTACT } = application;

const checkPolicySummaryList = ({
  [REQUESTED_START_DATE]: () => {
    const fieldId = REQUESTED_START_DATE;
    const expectedKey = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    const { day, month, year } = application.POLICY[fieldId];
    const timestamp = createTimestampFromNumbers(day, month, year);
    const expectedValue = formatDate(timestamp);

    const expectedChangeLinkText = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [CREDIT_PERIOD_WITH_BUYER]: () => {
    const fieldId = CREDIT_PERIOD_WITH_BUYER;
    const expectedKey = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;
    const expectedValue = application.POLICY[fieldId];

    const expectedChangeLinkText = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [POLICY_CURRENCY_CODE]: () => {
    const fieldId = POLICY_CURRENCY_CODE;
    const expectedKey = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    const currency = CURRENCIES.find((c) => c.isoCode === application.POLICY[fieldId]);

    const expectedValue = currency.name;

    const expectedChangeLinkText = FIELDS.CONTRACT_POLICY[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [DESCRIPTION]: () => {
    const fieldId = DESCRIPTION;
    const expectedKey = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    const expectedValue = application.EXPORT_CONTRACT[fieldId];

    const expectedChangeLinkText = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [FINAL_DESTINATION]: () => {
    const fieldId = FINAL_DESTINATION;
    const expectedKey = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    const country = COUNTRIES.find((c) => c.ISO_CODE === application.EXPORT_CONTRACT[fieldId]);

    const expectedValue = country.name;

    const expectedChangeLinkText = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  singleContractPolicy: {
    [POLICY_TYPE]: () => {
      const fieldId = POLICY_TYPE;
      const expectedKey = FIELDS[fieldId].SUMMARY.TITLE;
      const expectedValue = FIELD_VALUES.POLICY_TYPE.SINGLE;

      const expectedChangeLinkText = FIELDS[fieldId].SUMMARY.TITLE;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [CONTRACT_COMPLETION_DATE]: () => {
      const fieldId = CONTRACT_COMPLETION_DATE;

      const expectedKey = FIELDS.CONTRACT_POLICY.SINGLE[fieldId].SUMMARY.TITLE;

      const { day, month, year } = application.POLICY[fieldId];
      const timestamp = createTimestampFromNumbers(day, month, year);
      const expectedValue = formatDate(timestamp);

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.SINGLE[fieldId].SUMMARY.TITLE;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [TOTAL_CONTRACT_VALUE]: () => {
      const fieldId = TOTAL_CONTRACT_VALUE;
      const expectedKey = FIELDS.CONTRACT_POLICY.SINGLE[fieldId].SUMMARY.TITLE;
      const expectedValue = formatCurrency(application.POLICY[fieldId]);

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.SINGLE[fieldId].SUMMARY.TITLE;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
  },
  multipleContractPolicy: {
    [POLICY_TYPE]: () => {
      const fieldId = POLICY_TYPE;
      const expectedKey = FIELDS[fieldId].SUMMARY.TITLE;
      const expectedValue = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

      const expectedChangeLinkText = FIELDS[fieldId].SUMMARY.TITLE;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [TOTAL_MONTHS_OF_COVER]: () => {
      const fieldId = TOTAL_MONTHS_OF_COVER;
      const expectedKey = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      const expectedValue = `${application.POLICY[fieldId]} months`;

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [TOTAL_SALES_TO_BUYER]: () => {
      const fieldId = TOTAL_SALES_TO_BUYER;
      const expectedKey = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      const expectedValue = formatCurrency(application.POLICY[fieldId]);

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [MAXIMUM_BUYER_WILL_OWE]: () => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;
      const expectedKey = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      const expectedValue = formatCurrency(application.POLICY[fieldId]);

      const expectedChangeLinkText = FIELDS.CONTRACT_POLICY.MULTIPLE[fieldId].SUMMARY.TITLE;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
  },
  [NAME]: ({ sameName = true }) => {
    const fieldId = NAME;
    const expectedKey = FIELDS.NAME_ON_POLICY[fieldId].SUMMARY.TITLE;

    let expectedValue = `${account[FIRST_NAME]} ${account[LAST_NAME]}`;

    if (!sameName) {
      expectedValue = `${POLICY_CONTACT[FIRST_NAME]} ${POLICY_CONTACT[LAST_NAME]}`;
    }

    const expectedChangeLinkText = FIELDS.NAME_ON_POLICY[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [EMAIL]: () => {
    const fieldId = EMAIL;
    const expectedKey = FIELDS.DIFFERENT_NAME_ON_POLICY[fieldId].SUMMARY.TITLE;

    const expectedValue = POLICY_CONTACT[EMAIL];

    const expectedChangeLinkText = FIELDS.DIFFERENT_NAME_ON_POLICY[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [POSITION]: () => {
    const fieldId = POSITION;
    const expectedKey = FIELDS.NAME_ON_POLICY[fieldId].SUMMARY.TITLE;

    const expectedValue = POLICY_CONTACT[POSITION];

    const expectedChangeLinkText = FIELDS.NAME_ON_POLICY[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkPolicySummaryList;
