import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { summaryList } from '../../pages/shared';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../content-strings/fields/insurance/eligibility';
import { country } from '../../fixtures/application';
import getSummaryListField from './get-summary-list-field';

const {
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

const checkYourAnswersEligibilitySummaryList = ({
  [BUYER_COUNTRY]: () => {
    const fieldId = BUYER_COUNTRY;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = country.name;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [VALID_EXPORTER_LOCATION]: () => {
    const fieldId = VALID_EXPORTER_LOCATION;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.YES;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: () => {
    const fieldId = HAS_MINIMUM_UK_GOODS_OR_SERVICES;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].ANSWER;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [WANT_COVER_OVER_MAX_AMOUNT]: () => {
    const fieldId = WANT_COVER_OVER_MAX_AMOUNT;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [WANT_COVER_OVER_MAX_PERIOD]: () => {
    const fieldId = WANT_COVER_OVER_MAX_PERIOD;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [COMPANIES_HOUSE_NUMBER]: () => {
    const fieldId = COMPANIES_HOUSE_NUMBER;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.YES;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
});

export default checkYourAnswersEligibilitySummaryList;
