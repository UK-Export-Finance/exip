import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../content-strings/fields/insurance/business';
import { formatDate } from '../../helpers/date';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      COMPANIES_HOUSE: {
        COMPANY_NAME,
        COMPANY_NUMBER,
        COMPANY_ADDRESS,
        COMPANY_INCORPORATED,
        COMPANY_SIC,
        INDUSTRY_SECTOR_NAMES,
        FINANCIAL_YEAR_END_DATE,
      },
      YOUR_COMPANY: {
        ADDRESS: YOUR_COMPANY_ADDRESS,
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

const {
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: { DATE_FORMAT },
  },
} = FIELDS;

const checkYourBusinessSummaryList = ({
  [COMPANY_NUMBER]: () => {
    const fieldId = COMPANY_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [COMPANY_NAME]: () => {
    const fieldId = COMPANY_NAME;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [COMPANY_ADDRESS]: () => {
    const fieldId = COMPANY_ADDRESS;
    const expectedKey = FIELDS[fieldId].SUMMARY.TITLE;

    const row = summaryList.field(fieldId);

    cy.checkText(
      row.key(),
      expectedKey,
    );

    // as html, cannot use checkText so checking contains following fields
    row.value().contains(application.EXPORTER_COMPANY[YOUR_COMPANY_ADDRESS].addressLine1);
    row.value().contains(application.EXPORTER_COMPANY[YOUR_COMPANY_ADDRESS].addressLine2);
    row.value().contains(application.EXPORTER_COMPANY[YOUR_COMPANY_ADDRESS].locality);
    row.value().contains(application.EXPORTER_COMPANY[YOUR_COMPANY_ADDRESS].region);
    row.value().contains(application.EXPORTER_COMPANY[YOUR_COMPANY_ADDRESS].postalCode);

    row.changeLink().should('not.exist');
  },
  [COMPANY_INCORPORATED]: () => {
    const fieldId = COMPANY_INCORPORATED;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);

    const timestamp = application.EXPORTER_COMPANY[fieldId];
    const expectedValue = formatDate(timestamp);

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [COMPANY_SIC]: () => {
    const fieldId = COMPANY_SIC;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);

    const values = application.EXPORTER_COMPANY;

    const [sicCode] = values[fieldId];
    const [industrySectorName] = values[INDUSTRY_SECTOR_NAMES];

    const expectedValue = `${sicCode} - ${industrySectorName}`;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [FINANCIAL_YEAR_END_DATE]: () => {
    const fieldId = FINANCIAL_YEAR_END_DATE;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);

    const timestamp = application.EXPORTER_COMPANY[fieldId];

    const expectedValue = formatDate(timestamp, DATE_FORMAT);

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
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
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [PHONE_NUMBER]: () => {
    const fieldId = PHONE_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

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
