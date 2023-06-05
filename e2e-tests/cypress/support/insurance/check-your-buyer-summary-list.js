import { checkYourAnswersPage } from '../../e2e/pages/insurance/your-buyer';
import getSummaryListField from './get-summary-list-field';
import { FIELD_IDS } from '../../../constants';
import { LINKS, DEFAULT } from '../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../content-strings/fields/insurance/your-buyer';
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
      WORKING_WITH_BUYER: {
        CONNECTED_WITH_BUYER,
        TRADED_WITH_BUYER,
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
  [NAME]: () => {
    const fieldId = NAME;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_OR_ORGANISATION);
    const expectedValue = application.BUYER[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [ADDRESS]: () => {
    const fieldId = ADDRESS;
    const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

    const { summaryList } = checkYourAnswersPage;
    const row = summaryList[fieldId];

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

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [WEBSITE]: () => {
    const fieldId = WEBSITE;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.COMPANY_OR_ORGANISATION);
    const expectedValue = application.BUYER[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [FIRST_NAME]: () => {
    const fieldId = FIRST_NAME;
    const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

    const { summaryList } = checkYourAnswersPage;
    const row = summaryList[fieldId];

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

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [CONNECTED_WITH_BUYER]: () => {
    const fieldId = CONNECTED_WITH_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.WORKING_WITH_BUYER);
    const expectedValue = application.BUYER[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [TRADED_WITH_BUYER]: () => {
    const fieldId = TRADED_WITH_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.WORKING_WITH_BUYER);
    const expectedValue = application.BUYER[fieldId];

    assertRow(fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkYourBusinessSummaryList;
