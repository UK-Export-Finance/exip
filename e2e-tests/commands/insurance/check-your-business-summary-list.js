import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../content-strings/fields/insurance/business';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      YOUR_COMPANY: {
        TRADING_NAME,
        TRADING_ADDRESS,
        WEBSITE,
        PHONE_NUMBER,
      },
      NATURE_OF_YOUR_BUSINESS: {
        YEARS_EXPORTING,
        GOODS_OR_SERVICES,
        EMPLOYEES_INTERNATIONAL,
        EMPLOYEES_UK,
      },
      TURNOVER: {
        ESTIMATED_ANNUAL_TURNOVER,
        PERCENTAGE_TURNOVER,
      },
      BROKER: {
        USING_BROKER,
        NAME,
        ADDRESS_LINE_1,
        ADDRESS_LINE_2,
        TOWN,
        COUNTY,
        POSTCODE,
        EMAIL,
      },
    },
  },
} = FIELD_IDS;

const checkYourBusinessSummaryList = ({
  [TRADING_NAME]: () => {
    const fieldId = TRADING_NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.YES;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [TRADING_ADDRESS]: () => {
    const fieldId = TRADING_ADDRESS;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

    const expectedValue = FIELD_VALUES.YES;

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
  [EMPLOYEES_INTERNATIONAL]: () => {
    const fieldId = EMPLOYEES_INTERNATIONAL;

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
  [USING_BROKER]: () => {
    const fieldId = USING_BROKER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER);
    const expectedValue = application.EXPORTER_BROKER[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [NAME]: () => {
    const fieldId = NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER);
    const expectedValue = application.EXPORTER_BROKER[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [ADDRESS_LINE_1]: () => {
    const fieldId = ADDRESS_LINE_1;

    const expectedKey = FIELDS.BROKER[fieldId].SUMMARY.TITLE;

    const row = summaryList.field(fieldId);

    cy.checkText(
      row.key(),
      expectedKey,
    );

    // as html, cannot use checkText so checking contains following fields
    row.value().contains(application.EXPORTER_BROKER[fieldId]);
    row.value().contains(application.EXPORTER_BROKER[ADDRESS_LINE_2]);
    row.value().contains(application.EXPORTER_BROKER[TOWN]);
    row.value().contains(application.EXPORTER_BROKER[COUNTY]);
    row.value().contains(application.EXPORTER_BROKER[POSTCODE]);
  },
  [EMAIL]: () => {
    const fieldId = NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER);
    const expectedValue = application.EXPORTER_BROKER[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkYourBusinessSummaryList;
