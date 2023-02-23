import checkYourAnswersPage from '../../e2e/pages/your-business/check-your-answers/checkYourAnswers';
import getSummaryListField from './get-summary-list-field';
import { FIELD_IDS } from '../../../constants';
import { LINKS, DEFAULT } from '../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../content-strings/fields/insurance/exporter-business';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      COMPANY_HOUSE: {
        COMPANY_NAME,
        COMPANY_NUMBER,
        COMPANY_ADDRESS,
        COMPANY_INCORPORATED,
        COMPANY_SIC,
        FINANCIAL_YEAR_END_DATE,
      },
      YOUR_COMPANY: {
        TRADING_ADDRESS,
        TRADING_NAME,
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

    const { summaryList } = checkYourAnswersPage;
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
    const expectedValue = application.EXPORTER_COMPANY[fieldId][0];

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
    const expectedValue = application.EXPORTER_BUSINESS[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [PERCENTAGE_TURNOVER]: () => {
    const fieldId = PERCENTAGE_TURNOVER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.TURNOVER);
    const expectedValue = `${application.EXPORTER_BUSINESS[fieldId]}%`;

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkYourBusinessSummaryList;
