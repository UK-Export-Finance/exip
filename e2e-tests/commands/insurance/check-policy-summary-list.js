import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import { EXPECTED_SINGLE_LINE_STRING, FIELD_VALUES } from '../../constants';
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
    USING_BROKER,
    BROKER_DETAILS,
    REQUESTED_JOINTLY_INSURED_PARTY: {
      REQUESTED,
      COMPANY_NAME,
      COMPANY_NUMBER,
      COUNTRY_CODE,
    },
    LOSS_PAYEE: { IS_APPOINTED: LOSS_PAYEE_IS_APPOINTED },
    LOSS_PAYEE_DETAILS: { NAME: LOSS_PAYEE_NAME },
    LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
    LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
    FINANCIAL_ADDRESS,
  },
  ACCOUNT: { EMAIL, FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

const {
  CONTRACT_POLICY,
  EXPORT_VALUE,
  NAME_ON_POLICY,
  DIFFERENT_NAME_ON_POLICY,
  REQUESTED_JOINTLY_INSURED_PARTY,
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
  [CURRENCY_CODE]: (expectedCurrencyName) => {
    const fieldId = CURRENCY_CODE;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, CONTRACT_POLICY);

    let expectedValue;

    if (expectedCurrencyName) {
      expectedValue = expectedCurrencyName;
    } else {
      const currency = CURRENCIES.find((c) => c.isoCode === application.POLICY[POLICY_CURRENCY_CODE]);

      expectedValue = currency.name;
    }

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
    [TOTAL_CONTRACT_VALUE]: (currencyCode) => {
      const fieldId = TOTAL_CONTRACT_VALUE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, CONTRACT_POLICY.SINGLE);

      const expectedValue = formatCurrency(application.POLICY[fieldId], currencyCode);

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
    [TOTAL_SALES_TO_BUYER]: (currencyCode) => {
      const fieldId = TOTAL_SALES_TO_BUYER;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, EXPORT_VALUE.MULTIPLE);

      const expectedValue = formatCurrency(application.POLICY[fieldId], currencyCode);

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [MAXIMUM_BUYER_WILL_OWE]: (currencyCode) => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, EXPORT_VALUE.MULTIPLE);

      const expectedValue = formatCurrency(application.POLICY[fieldId], currencyCode);

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
  [EMAIL]: ({ renderChangeLink = true }) => {
    const fieldId = EMAIL;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, DIFFERENT_NAME_ON_POLICY);

    const expectedValue = POLICY_CONTACT[EMAIL];

    if (renderChangeLink) {
      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
    }
  },
  [POSITION]: () => {
    const fieldId = POSITION;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, NAME_ON_POLICY);

    const expectedValue = POLICY_CONTACT[POSITION];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [USING_BROKER]: ({ usingBroker = false }) => {
    const fieldId = USING_BROKER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER);

    let expectedValue = FIELD_VALUES.NO;

    if (usingBroker) {
      expectedValue = FIELD_VALUES.YES;
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  BROKER: {
    [BROKER_DETAILS.NAME]: () => {
      const fieldId = BROKER_DETAILS.NAME;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER_DETAILS);
      const expectedValue = application.BROKER[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [BROKER_DETAILS.FULL_ADDRESS]: () => {
      const fieldId = BROKER_DETAILS.FULL_ADDRESS;

      const expectedKey = FIELDS.BROKER_DETAILS[fieldId].SUMMARY.TITLE;

      const row = summaryList.field(fieldId);

      cy.checkText(
        row.key(),
        expectedKey,
      );

      row.value().contains(EXPECTED_SINGLE_LINE_STRING);

      const expectedLineBreaks = 3;

      cy.assertLength(
        row.valueHtmlLineBreak(),
        expectedLineBreaks,
      );
    },
    [BROKER_DETAILS.EMAIL]: () => {
      const fieldId = BROKER_DETAILS.NAME;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER_DETAILS);
      const expectedValue = application.BROKER[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
  },
  REQUESTED_JOINTLY_INSURED_PARTY: {
    [REQUESTED]: ({ requested = false }) => {
      const fieldId = REQUESTED;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, REQUESTED_JOINTLY_INSURED_PARTY);

      let expectedValue = FIELD_VALUES.NO;

      if (requested) {
        expectedValue = FIELD_VALUES.YES;
      }

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    },
    [COMPANY_NAME]: ({ shouldRender = false, name = application.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NAME] }) => {
      const fieldId = COMPANY_NAME;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, REQUESTED_JOINTLY_INSURED_PARTY);

      if (shouldRender) {
        const expectedValue = name;

        cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
    [COMPANY_NUMBER]: ({ shouldRender = false, companyNumber = application.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NUMBER] }) => {
      const fieldId = COMPANY_NUMBER;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, REQUESTED_JOINTLY_INSURED_PARTY);

      if (shouldRender) {
        const expectedValue = companyNumber;

        cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
    [COUNTRY_CODE]: ({ shouldRender = false, country = application.REQUESTED_JOINTLY_INSURED_PARTY[COUNTRY_CODE] }) => {
      const fieldId = COUNTRY_CODE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, REQUESTED_JOINTLY_INSURED_PARTY);

      if (shouldRender) {
        const expectedValue = country;

        cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
  },
  [LOSS_PAYEE_IS_APPOINTED]: ({ isAppointingLossPayee = false }) => {
    const fieldId = LOSS_PAYEE_IS_APPOINTED;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.LOSS_PAYEE);

    let expectedValue = FIELD_VALUES.NO;

    if (isAppointingLossPayee) {
      expectedValue = FIELD_VALUES.YES;
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  LOSS_PAYEE: {
    [LOSS_PAYEE_NAME]: ({ shouldRender = false }) => {
      const fieldId = LOSS_PAYEE_NAME;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.LOSS_PAYEE_DETAILS);

      if (shouldRender) {
        const expectedValue = application.POLICY[fieldId];

        cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
    [LOSS_PAYEE_NAME]: ({ shouldRender = false }) => {
      const fieldId = LOSS_PAYEE_NAME;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.LOSS_PAYEE_DETAILS);

      if (shouldRender) {
        const expectedValue = application.POLICY[fieldId];

        cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
    [FINANCIAL_ADDRESS]: ({ shouldRender = false, isUk = false, isInternational = false }) => {
      const fieldId = FINANCIAL_ADDRESS;

      let expectedKey;

      if (isUk) {
        expectedKey = FIELDS.LOSS_PAYEE_FINANCIAL_UK[fieldId].SUMMARY.TITLE;
      }

      if (isInternational) {
        expectedKey = FIELDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[fieldId].SUMMARY.TITLE;
      }

      if (shouldRender) {
        const row = summaryList.field(fieldId);

        cy.checkText(
          row.key(),
          expectedKey,
        );

        row.value().contains(EXPECTED_SINGLE_LINE_STRING);

        const expectedLineBreaks = 3;

        cy.assertLength(
          row.valueHtmlLineBreak(),
          expectedLineBreaks,
        );
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
    [SORT_CODE]: ({ shouldRender = false }) => {
      const fieldId = SORT_CODE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.LOSS_PAYEE_FINANCIAL_UK);

      if (shouldRender) {
        const expectedValue = application.POLICY.LOSS_PAYEE_FINANCIAL_UK[fieldId];

        cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
    [ACCOUNT_NUMBER]: ({ shouldRender = false }) => {
      const fieldId = ACCOUNT_NUMBER;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.LOSS_PAYEE_FINANCIAL_UK);

      if (shouldRender) {
        const expectedValue = application.POLICY.LOSS_PAYEE_FINANCIAL_UK[fieldId];

        cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
    [BIC_SWIFT_CODE]: ({ shouldRender = false }) => {
      const fieldId = BIC_SWIFT_CODE;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL);

      if (shouldRender) {
        const expectedValue = application.POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[fieldId];

        cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
    [IBAN]: ({ shouldRender = false }) => {
      const fieldId = IBAN;

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL);

      if (shouldRender) {
        const expectedValue = application.POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[fieldId];

        cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
      } else {
        cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
      }
    },
  },
});

export default checkPolicySummaryList;
