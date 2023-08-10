import getSummaryListField from './get-summary-list-field';
import { summaryList } from '../../e2e/pages/shared';
import { FIELD_IDS } from '../../../constants';
import { LINKS, DEFAULT } from '../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../content-strings/fields/insurance/business';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    ACCOUNT: {
      FIRST_NAME,
      LAST_NAME,
      EMAIL: ACCOUNT_EMAIL,
    },
    EXPORTER_BUSINESS: {
      COMPANY_HOUSE: {
        COMPANY_NAME,
        COMPANY_NUMBER,
        COMPANY_ADDRESS,
        COMPANY_INCORPORATED,
        COMPANY_SIC,
        INDUSTRY_SECTOR_NAME,
        FINANCIAL_YEAR_END_DATE,
      },
      YOUR_COMPANY: {
        TRADING_ADDRESS,
        TRADING_NAME,
        WEBSITE,
        PHONE_NUMBER,
      },
      CONTACT: {
        NAME: CONTACT_NAME,
        POSITION,
        BUSINESS_CONTACT_DETAIL,
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

const assertRow = (fieldId, expectedKey, expectedValue, expectedChangeLinkText) => {
  const row = summaryList[fieldId];

  cy.checkText(
    row.key(),
    expectedKey,
  );

  /**
   * if value exists then checkText
   * else check if dash
   */
  if (expectedValue) {
    cy.checkText(
      row.value(),
      expectedValue,
    );
  } else {
    cy.checkText(
      row.value(),
      DEFAULT.EMPTY,
    );
  }

  /**
   * if change link text, if there is an expected value, then should contain change
   * else if no expected value, should say add
   * if no expectedChangeLinkText, then should not have changeLink
   */
  if (expectedChangeLinkText) {
    if (expectedValue) {
      cy.checkText(
        row.changeLink(),
        `${LINKS.CHANGE} ${expectedChangeLinkText}`,
      );
    } else {
      cy.checkText(
        row.changeLink(),
        `${LINKS.ADD} ${expectedChangeLinkText}`,
      );
    }
  } else {
    row.changeLink().should('not.exist');
  }
};

const checkYourBusinessSummaryList = ({
  [COMPANY_NUMBER]: () => {
    const fieldId = COMPANY_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [COMPANY_NAME]: () => {
    const fieldId = COMPANY_NAME;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [COMPANY_ADDRESS]: () => {
    const fieldId = COMPANY_ADDRESS;
    const expectedKey = FIELDS[fieldId].SUMMARY.TITLE;

    const row = summaryList[fieldId];

    cy.checkText(
      row.key(),
      expectedKey,
    );

    // as html, cannot use checkText so checking contains following fields
    row.value().contains(application.EXPORTER_COMPANY[fieldId].addressLine1);
    row.value().contains(application.EXPORTER_COMPANY[fieldId].addressLine2);
    row.value().contains(application.EXPORTER_COMPANY[fieldId].locality);
    row.value().contains(application.EXPORTER_COMPANY[fieldId].region);
    row.value().contains(application.EXPORTER_COMPANY[fieldId].postalCode);

    row.changeLink().should('not.exist');
  },
  [COMPANY_INCORPORATED]: () => {
    const fieldId = COMPANY_INCORPORATED;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [COMPANY_SIC]: () => {
    const fieldId = COMPANY_SIC;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = `${application.EXPORTER_COMPANY[fieldId][0]} - ${application.EXPORTER_COMPANY[INDUSTRY_SECTOR_NAME][0]}`;

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [FINANCIAL_YEAR_END_DATE]: () => {
    const fieldId = FINANCIAL_YEAR_END_DATE;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [TRADING_NAME]: () => {
    const fieldId = TRADING_NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [TRADING_ADDRESS]: () => {
    const fieldId = TRADING_ADDRESS;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [WEBSITE]: () => {
    const fieldId = WEBSITE;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [PHONE_NUMBER]: () => {
    const fieldId = PHONE_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.EXPORTER_COMPANY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [`contact-${CONTACT_NAME}`]: () => {
    const fieldId = CONTACT_NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.CONTACT);

    const firstName = application.EXPORTER_BUSINESS[BUSINESS_CONTACT_DETAIL][FIRST_NAME];
    const lastName = application.EXPORTER_BUSINESS[BUSINESS_CONTACT_DETAIL][LAST_NAME];

    const expectedValue = `${firstName} ${lastName}`;

    assertRow(`contact-${fieldId}`, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [`contact-${ACCOUNT_EMAIL}`]: () => {
    const fieldId = ACCOUNT_EMAIL;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.CONTACT);

    const expectedValue = application.EXPORTER_BUSINESS[BUSINESS_CONTACT_DETAIL][ACCOUNT_EMAIL];

    assertRow(`contact-${ACCOUNT_EMAIL}`, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [POSITION]: () => {
    const fieldId = POSITION;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.CONTACT);

    const expectedValue = application.EXPORTER_BUSINESS[BUSINESS_CONTACT_DETAIL][POSITION];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [GOODS_OR_SERVICES]: () => {
    const fieldId = GOODS_OR_SERVICES;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.NATURE_OF_YOUR_BUSINESS);
    const expectedValue = application.EXPORTER_BUSINESS[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [YEARS_EXPORTING]: () => {
    const fieldId = YEARS_EXPORTING;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.NATURE_OF_YOUR_BUSINESS);
    const expectedValue = application.EXPORTER_BUSINESS[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [EMPLOYEES_UK]: () => {
    const fieldId = EMPLOYEES_UK;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.NATURE_OF_YOUR_BUSINESS);
    const expectedValue = application.EXPORTER_BUSINESS[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [EMPLOYEES_INTERNATIONAL]: () => {
    const fieldId = EMPLOYEES_INTERNATIONAL;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.NATURE_OF_YOUR_BUSINESS);
    const expectedValue = application.EXPORTER_BUSINESS[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [ESTIMATED_ANNUAL_TURNOVER]: () => {
    const fieldId = ESTIMATED_ANNUAL_TURNOVER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.TURNOVER);
    const expectedValue = `£${application.EXPORTER_BUSINESS[fieldId]}`;

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [PERCENTAGE_TURNOVER]: () => {
    const fieldId = PERCENTAGE_TURNOVER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.TURNOVER);
    const expectedValue = `${application.EXPORTER_BUSINESS[fieldId]}%`;

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [USING_BROKER]: () => {
    const fieldId = USING_BROKER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER);
    const expectedValue = application.EXPORTER_BROKER[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [NAME]: () => {
    const fieldId = NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.BROKER);
    const expectedValue = application.EXPORTER_BROKER[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [ADDRESS_LINE_1]: () => {
    const fieldId = ADDRESS_LINE_1;

    const expectedKey = FIELDS.BROKER[fieldId].SUMMARY.TITLE;

    const row = summaryList[fieldId];

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

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkYourBusinessSummaryList;
