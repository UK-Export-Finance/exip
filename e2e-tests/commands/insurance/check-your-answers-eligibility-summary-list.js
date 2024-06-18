import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { summaryList } from '../../pages/shared';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../content-strings/fields/insurance/eligibility';
import application, { country } from '../../fixtures/application';
import getSummaryListField from './get-summary-list-field';

const { COMPANY } = application;

const {
  TOTAL_CONTRACT_VALUE,
  COVER_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  HAS_COMPANIES_HOUSE_NUMBER,
  HAS_END_BUYER,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

const { COMPANY_NAME } = FIELD_IDS.INSURANCE.COMPANIES_HOUSE;

const checkYourAnswersEligibilitySummaryList = ({
  [BUYER_COUNTRY]: () => {
    const fieldId = BUYER_COUNTRY;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = country.NAME;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [VALID_EXPORTER_LOCATION]: () => {
    const fieldId = VALID_EXPORTER_LOCATION;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.YES;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: () => {
    const fieldId = HAS_MINIMUM_UK_GOODS_OR_SERVICES;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].ANSWER;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [TOTAL_CONTRACT_VALUE]: () => {
    const fieldId = TOTAL_CONTRACT_VALUE;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELDS[fieldId].SUMMARY.BELOW;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [COVER_PERIOD]: () => {
    const fieldId = COVER_PERIOD;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELDS[fieldId].OPTIONS.BELOW.TEXT;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [HAS_COMPANIES_HOUSE_NUMBER]: () => {
    const fieldId = HAS_COMPANIES_HOUSE_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.YES;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [COMPANY_NAME]: () => {
    const fieldId = COMPANY_NAME;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = COMPANY[COMPANY_NAME];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [COMPANIES_HOUSE_NUMBER]: () => {
    const fieldId = COMPANIES_HOUSE_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = COMPANY[COMPANIES_HOUSE_NUMBER];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [HAS_END_BUYER]: () => {
    const fieldId = HAS_END_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkYourAnswersEligibilitySummaryList;
