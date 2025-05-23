import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import { FIELD_VALUES } from '../../constants';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../content-strings/fields/insurance/your-buyer';
import application from '../../fixtures/application';
import formatCurrency from '../../helpers/format-currency';

const {
  CURRENCY: { CURRENCY_CODE },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE },
    CONNECTION_WITH_BUYER,
    CONNECTION_WITH_BUYER_DESCRIPTION,
    TRADED_WITH_BUYER,
    OUTSTANDING_PAYMENTS,
    FAILED_PAYMENTS,
    TOTAL_AMOUNT_OVERDUE,
    TOTAL_OUTSTANDING_PAYMENTS,
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    HAS_BUYER_FINANCIAL_ACCOUNTS,
  },
  ELIGIBILITY: { BUYER_COUNTRY },
} = INSURANCE_FIELD_IDS;

const checkYourBusinessSummaryList = {
  [NAME]: () => {
    const fieldId = NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_OR_ORGANISATION);
    const expectedValue = application.BUYER[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [ADDRESS]: () => {
    const fieldId = ADDRESS;
    const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

    const row = summaryList.field(fieldId);

    cy.checkText(row.key(), expectedKey);

    // as html, cannot use checkText so checking contains following fields
    row.value().contains(application.BUYER[fieldId]);

    row.changeLink().should('exist');
  },
  [COUNTRY]: () => {
    const fieldId = COUNTRY;
    const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

    const expectedValue = application[BUYER_COUNTRY];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [REGISTRATION_NUMBER]: () => {
    const fieldId = REGISTRATION_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_OR_ORGANISATION);
    const expectedValue = application.BUYER[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [WEBSITE]: () => {
    const fieldId = WEBSITE;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_OR_ORGANISATION);
    const expectedValue = application.BUYER[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [CONNECTION_WITH_BUYER]: ({ isYes = false }) => {
    const fieldId = CONNECTION_WITH_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

    let expectedValue;

    if (isYes) {
      expectedValue = FIELD_VALUES.YES;
    } else {
      expectedValue = application.BUYER[fieldId];
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [CONNECTION_WITH_BUYER_DESCRIPTION]: ({ shouldRender = true }) => {
    const fieldId = CONNECTION_WITH_BUYER_DESCRIPTION;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
      const expectedValue = application.BUYER[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [TRADED_WITH_BUYER]: ({ isYes = false }) => {
    const fieldId = TRADED_WITH_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

    let expectedValue;

    if (isYes) {
      expectedValue = FIELD_VALUES.YES;
    } else {
      expectedValue = application.BUYER[fieldId];
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [OUTSTANDING_PAYMENTS]: ({ shouldRender = false, isYes = false }) => {
    const fieldId = OUTSTANDING_PAYMENTS;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

      let expectedValue;

      if (isYes) {
        expectedValue = FIELD_VALUES.YES;
      } else {
        expectedValue = FIELD_VALUES.NO;
      }

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [CURRENCY_CODE]: ({ shouldRender = false }) => {
    const fieldId = CURRENCY_CODE;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, application.BUYER[CURRENCY_CODE], expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [TOTAL_AMOUNT_OVERDUE]: ({ shouldRender = false }) => {
    const fieldId = TOTAL_AMOUNT_OVERDUE;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
      const expectedValue = formatCurrency(application.BUYER[fieldId], application.BUYER[CURRENCY_CODE]);

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [TOTAL_OUTSTANDING_PAYMENTS]: ({ shouldRender = false }) => {
    const fieldId = TOTAL_OUTSTANDING_PAYMENTS;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
      const expectedValue = formatCurrency(application.BUYER[fieldId], application.BUYER[CURRENCY_CODE]);

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [FAILED_PAYMENTS]: ({ shouldRender = false, isYes = false }) => {
    const fieldId = FAILED_PAYMENTS;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

      let expectedValue;

      if (isYes) {
        expectedValue = FIELD_VALUES.YES;
      } else {
        expectedValue = FIELD_VALUES.NO;
      }

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: ({ shouldRender = true, isYes = false }) => {
    const fieldId = HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

      let expectedValue;

      if (isYes) {
        expectedValue = FIELD_VALUES.YES;
      } else {
        expectedValue = application.BUYER[fieldId];
      }

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: ({ shouldRender = true }) => {
    const fieldId = PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
      const expectedValue = application.BUYER[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [HAS_BUYER_FINANCIAL_ACCOUNTS]: ({ isYes = false }) => {
    const fieldId = HAS_BUYER_FINANCIAL_ACCOUNTS;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

    let expectedValue;

    if (isYes) {
      expectedValue = FIELD_VALUES.YES;
    } else {
      expectedValue = application.BUYER[fieldId];
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
};

export default checkYourBusinessSummaryList;
