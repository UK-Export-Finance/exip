import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import { FIELD_VALUES } from '../../constants';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { POLICY_FIELDS as FIELDS } from '../../content-strings/fields/insurance/policy';
import account from '../../fixtures/account';
import application from '../../fixtures/application';
import CURRENCIES from '../../fixtures/currencies';
import formatCurrency from '../../helpers/format-currency';
import { createTimestampFromNumbers, formatDate } from '../../helpers/date';

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    NEED_PRE_CREDIT_PERIOD,
    CREDIT_PERIOD_WITH_BUYER,
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      MULTIPLE: {
        TOTAL_MONTHS_OF_COVER,
      },
    },
    EXPORT_VALUE: {
      MULTIPLE: {
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
    NAME_ON_POLICY: { NAME, POSITION },
    BROKER,
  },
  ACCOUNT: { EMAIL, FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

const {
  CONTRACT_POLICY,
  EXPORT_VALUE,
  NAME_ON_POLICY,
  DIFFERENT_NAME_ON_POLICY,
} = FIELDS;

const { POLICY_CONTACT } = application;

const checkPolicySummaryList = ({
  [REQUESTED_START_DATE]: () => {
    const fieldId = REQUESTED_START_DATE;
    const { day, month, year } = application.POLICY[fieldId];
    const timestamp = createTimestampFromNumbers(day, month, year);

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, CONTRACT_POLICY);

    const expectedValue = formatDate(timestamp);

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [CURRENCY_CODE]: () => {
    const fieldId = CURRENCY_CODE;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, CONTRACT_POLICY);

    const currency = CURRENCIES.find((c) => c.isoCode === application.POLICY[POLICY_CURRENCY_CODE]);
    const expectedValue = currency.name;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [NEED_PRE_CREDIT_PERIOD]: ({ needPreCreditPeriod = false }) => {
    const fieldId = NEED_PRE_CREDIT_PERIOD;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

    let expectedValue = FIELD_VALUES.NO;

    if (needPreCreditPeriod) {
      expectedValue = FIELD_VALUES.YES;
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [CREDIT_PERIOD_WITH_BUYER]: ({ shouldRender = false }) => {
    const fieldId = CREDIT_PERIOD_WITH_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

    if (shouldRender) {
      const expectedValue = application.POLICY[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  singleContractPolicy: {
    [POLICY_TYPE]: () => {
      const fieldId = POLICY_TYPE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
      const expectedValue = FIELD_VALUES.POLICY_TYPE.SINGLE;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [CONTRACT_COMPLETION_DATE]: () => {
      const fieldId = CONTRACT_COMPLETION_DATE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, CONTRACT_POLICY.SINGLE);

      const { day, month, year } = application.POLICY[fieldId];
      const timestamp = createTimestampFromNumbers(day, month, year);
      const expectedValue = formatDate(timestamp);

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [TOTAL_CONTRACT_VALUE]: () => {
      const fieldId = TOTAL_CONTRACT_VALUE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, CONTRACT_POLICY.SINGLE);

      const expectedValue = formatCurrency(application.POLICY[fieldId]);

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
  },
  multipleContractPolicy: {
    [POLICY_TYPE]: () => {
      const fieldId = POLICY_TYPE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

      const expectedValue = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [TOTAL_MONTHS_OF_COVER]: () => {
      const fieldId = TOTAL_MONTHS_OF_COVER;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, CONTRACT_POLICY.MULTIPLE);

      const expectedValue = `${application.POLICY[fieldId]} months`;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [TOTAL_SALES_TO_BUYER]: () => {
      const fieldId = TOTAL_SALES_TO_BUYER;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, EXPORT_VALUE.MULTIPLE);

      const expectedValue = formatCurrency(application.POLICY[fieldId]);

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [MAXIMUM_BUYER_WILL_OWE]: () => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, EXPORT_VALUE.MULTIPLE);

      const expectedValue = formatCurrency(application.POLICY[fieldId]);

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
  },
  [NAME]: ({ sameName = true }) => {
    const fieldId = NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, NAME_ON_POLICY);

    let expectedValue = `${account[FIRST_NAME]} ${account[LAST_NAME]}`;

    if (!sameName) {
      expectedValue = `${POLICY_CONTACT[FIRST_NAME]} ${POLICY_CONTACT[LAST_NAME]}`;
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [EMAIL]: () => {
    const fieldId = EMAIL;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, DIFFERENT_NAME_ON_POLICY);

    const expectedValue = POLICY_CONTACT[EMAIL];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [POSITION]: () => {
    const fieldId = POSITION;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, NAME_ON_POLICY);

    const expectedValue = POLICY_CONTACT[POSITION];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [BROKER.USING_BROKER]: ({ usingBroker = false }) => {
    const fieldId = BROKER.USING_BROKER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER);

    let expectedValue = FIELD_VALUES.NO;

    if (usingBroker) {
      expectedValue = FIELD_VALUES.YES;
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  BROKER: {
    [BROKER.NAME]: () => {
      const fieldId = BROKER.NAME;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER);
      const expectedValue = application.EXPORTER_BROKER[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [BROKER.ADDRESS_LINE_1]: () => {
      const fieldId = BROKER.ADDRESS_LINE_1;

      const expectedKey = FIELDS.BROKER[fieldId].SUMMARY.TITLE;

      const row = summaryList.field(fieldId);

      cy.checkText(
        row.key(),
        expectedKey,
      );

      // as html, cannot use checkText so checking contains following fields
      row.value().contains(application.EXPORTER_BROKER[fieldId]);
      row.value().contains(application.EXPORTER_BROKER[BROKER.ADDRESS_LINE_2]);
      row.value().contains(application.EXPORTER_BROKER[BROKER.TOWN]);
      row.value().contains(application.EXPORTER_BROKER[BROKER.COUNTY]);
      row.value().contains(application.EXPORTER_BROKER[BROKER.POSTCODE]);
    },
    [BROKER.EMAIL]: () => {
      const fieldId = BROKER.NAME;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER);
      const expectedValue = application.EXPORTER_BROKER[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
  },
});

export default checkPolicySummaryList;
