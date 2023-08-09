import { FIELD_IDS } from '../../constants';
import checkYourAnswersEligibilityPage from '../../pages/insurance/check-your-answers/eligibility';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../content-strings/fields/insurance/eligibility';
import application from '../../fixtures/application';
import { LINKS, DEFAULT } from '../../content-strings';
import getSummaryListField from './get-summary-list-field';

const {
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

const assertRow = (fieldId, expectedKey, expectedValue, expectedChangeLinkText) => {
  const { summaryList } = checkYourAnswersEligibilityPage;
  const row = summaryList.field(fieldId);

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

const checkYourAnswersEligibilitySummaryList = ({
  [BUYER_COUNTRY]: () => {
    const fieldId = BUYER_COUNTRY;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.ELIGIBILITY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [VALID_EXPORTER_LOCATION]: () => {
    const fieldId = VALID_EXPORTER_LOCATION;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.ELIGIBILITY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: () => {
    const fieldId = HAS_MINIMUM_UK_GOODS_OR_SERVICES;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.ELIGIBILITY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [WANT_COVER_OVER_MAX_AMOUNT]: () => {
    const fieldId = WANT_COVER_OVER_MAX_AMOUNT;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.ELIGIBILITY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [WANT_COVER_OVER_MAX_PERIOD]: () => {
    const fieldId = WANT_COVER_OVER_MAX_PERIOD;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.ELIGIBILITY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [OTHER_PARTIES_INVOLVED]: () => {
    const fieldId = OTHER_PARTIES_INVOLVED;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.ELIGIBILITY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [LETTER_OF_CREDIT]: () => {
    const fieldId = LETTER_OF_CREDIT;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.ELIGIBILITY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [PRE_CREDIT_PERIOD]: () => {
    const fieldId = PRE_CREDIT_PERIOD;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.ELIGIBILITY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
  [COMPANIES_HOUSE_NUMBER]: () => {
    const fieldId = COMPANIES_HOUSE_NUMBER;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = application.ELIGIBILITY[fieldId];

    assertRow(fieldId, expectedKey, expectedValue);
  },
});

export default checkYourAnswersEligibilitySummaryList;
