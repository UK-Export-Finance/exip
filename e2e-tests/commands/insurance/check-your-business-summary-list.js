import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../content-strings/fields/insurance/business';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      YOUR_COMPANY: {
        HAS_DIFFERENT_TRADING_NAME,
        TRADING_ADDRESS,
        WEBSITE,
        PHONE_NUMBER,
      },
      NATURE_OF_YOUR_BUSINESS: {
        YEARS_EXPORTING,
        GOODS_OR_SERVICES,
        EMPLOYEES_UK,
      },
      TURNOVER: {
        ESTIMATED_ANNUAL_TURNOVER,
        PERCENTAGE_TURNOVER,
      },
      HAS_CREDIT_CONTROL,
    },
  },
} = FIELD_IDS;

const checkYourBusinessSummaryList = ({
  [HAS_DIFFERENT_TRADING_NAME]: () => {
    const fieldId = HAS_DIFFERENT_TRADING_NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [TRADING_ADDRESS]: () => {
    const fieldId = TRADING_ADDRESS;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

    const expectedValue = FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [WEBSITE]: () => {
    const fieldId = WEBSITE;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.COMPANY[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [PHONE_NUMBER]: () => {
    const fieldId = PHONE_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
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
  [ESTIMATED_ANNUAL_TURNOVER]: () => {
    const fieldId = ESTIMATED_ANNUAL_TURNOVER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.TURNOVER);
    const expectedValue = `£${application.EXPORTER_BUSINESS[fieldId]}`;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [PERCENTAGE_TURNOVER]: () => {
    const fieldId = PERCENTAGE_TURNOVER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.TURNOVER);
    const expectedValue = `${application.EXPORTER_BUSINESS[fieldId]}%`;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [HAS_CREDIT_CONTROL]: () => {
    const fieldId = HAS_CREDIT_CONTROL;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.YES;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkYourBusinessSummaryList;
