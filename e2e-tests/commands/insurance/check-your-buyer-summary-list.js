import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import { FIELD_IDS } from '../../constants';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../content-strings/fields/insurance/your-buyer';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: {
        NAME,
        ADDRESS,
        REGISTRATION_NUMBER,
        WEBSITE,
        FIRST_NAME,
        LAST_NAME,
        POSITION,
        EMAIL,
        CAN_CONTACT_BUYER,
      },
      CONNECTION_WITH_BUYER,
      TRADED_WITH_BUYER,
    },
  },
} = FIELD_IDS;

const checkYourBusinessSummaryList = ({
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

    cy.checkText(
      row.key(),
      expectedKey,
    );

    // as html, cannot use checkText so checking contains following fields
    row.value().contains(application.BUYER[fieldId]);

    row.changeLink().should('exist');
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
  [FIRST_NAME]: () => {
    const fieldId = FIRST_NAME;
    const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

    const row = summaryList.field(fieldId);

    cy.checkText(
      row.key(),
      expectedKey,
    );

    // as html, cannot use checkText so checking contains following fields
    row.value().contains(`${application.BUYER[fieldId]} ${application.BUYER[LAST_NAME]}`);
    row.value().contains(application.BUYER[POSITION]);
    row.value().contains(application.BUYER[EMAIL]);

    row.changeLink().should('exist');
  },
  [CAN_CONTACT_BUYER]: () => {
    const fieldId = CAN_CONTACT_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_OR_ORGANISATION);
    const expectedValue = application.BUYER[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [CONNECTION_WITH_BUYER]: () => {
    const fieldId = CONNECTION_WITH_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.BUYER[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [TRADED_WITH_BUYER]: () => {
    const fieldId = TRADED_WITH_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.BUYER[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkYourBusinessSummaryList;
