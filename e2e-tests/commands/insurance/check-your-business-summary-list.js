import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import { GBP_CURRENCY_CODE, FIELD_VALUES } from '../../constants';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../content-strings/fields/insurance/business';
import formatCurrency from '../../helpers/format-currency';
import application from '../../fixtures/application';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, HAS_DIFFERENT_TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, GOODS_OR_SERVICES, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER, TURNOVER_CURRENCY_CODE },
    HAS_CREDIT_CONTROL,
  },
} = INSURANCE_FIELD_IDS;

const checkYourBusinessSummaryList = {
  [HAS_DIFFERENT_TRADING_NAME]: ({ differentTradingName = false }) => {
    const fieldId = HAS_DIFFERENT_TRADING_NAME;

    const { YOUR_COMPANY } = application;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_DETAILS);
    const expectedValue = differentTradingName ? YOUR_COMPANY[DIFFERENT_TRADING_NAME] : FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [HAS_DIFFERENT_TRADING_ADDRESS]: ({ differentTradingAddress = false }) => {
    const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_DETAILS);

    const expectedValue = differentTradingAddress ? application.DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS] : FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [WEBSITE]: () => {
    const fieldId = WEBSITE;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_DETAILS);
    const expectedValue = application.COMPANY[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [PHONE_NUMBER]: () => {
    const fieldId = PHONE_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_DETAILS);
    const expectedValue = application.COMPANY[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [GOODS_OR_SERVICES]: () => {
    const fieldId = GOODS_OR_SERVICES;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.NATURE_OF_YOUR_BUSINESS);
    const expectedValue = application.EXPORTER_BUSINESS[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [YEARS_EXPORTING]: () => {
    const fieldId = YEARS_EXPORTING;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.NATURE_OF_YOUR_BUSINESS);
    const expectedValue = application.EXPORTER_BUSINESS[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [EMPLOYEES_UK]: () => {
    const fieldId = EMPLOYEES_UK;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.NATURE_OF_YOUR_BUSINESS);
    const expectedValue = application.EXPORTER_BUSINESS[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [TURNOVER_CURRENCY_CODE]: () => {
    const fieldId = TURNOVER_CURRENCY_CODE;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.TURNOVER);
    const expectedValue = application.EXPORTER_BUSINESS[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [ESTIMATED_ANNUAL_TURNOVER]: () => {
    const fieldId = ESTIMATED_ANNUAL_TURNOVER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.TURNOVER);
    const expectedValue = formatCurrency(application.EXPORTER_BUSINESS[fieldId], GBP_CURRENCY_CODE);

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [PERCENTAGE_TURNOVER]: () => {
    const fieldId = PERCENTAGE_TURNOVER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.TURNOVER);
    const expectedValue = `${application.EXPORTER_BUSINESS[fieldId]}%`;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [HAS_CREDIT_CONTROL]: ({ isYes = false }) => {
    const fieldId = HAS_CREDIT_CONTROL;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

    let expectedValue;

    if (isYes) {
      expectedValue = FIELD_VALUES.YES;
    } else {
      expectedValue = FIELD_VALUES.NO;
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
};

export default checkYourBusinessSummaryList;
