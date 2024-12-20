import { FIELD_IDS, FIELD_VALUES, COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME } from '../../constants';
import { summaryList } from '../../pages/shared';
import { ELIGIBILITY_FIELDS as FIELDS } from '../../content-strings/fields/insurance/eligibility';
import application, { country } from '../../fixtures/application';
import getSummaryListField from './get-summary-list-field';
import mockCompanies from '../../fixtures/companies';

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
  IS_MEMBER_OF_A_GROUP,
  IS_PARTY_TO_CONSORTIUM,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

const { COMPANY_NAME } = FIELD_IDS.INSURANCE.COMPANIES_HOUSE;

const checkYourAnswersEligibilitySummaryList = {
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
  [COMPANY_NAME]: ({ withSpecialCharacters = false }) => {
    const fieldId = COMPANY_NAME;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);

    let expectedValue = COMPANY[COMPANY_NAME];

    if (withSpecialCharacters) {
      expectedValue = mockCompanies[COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME][COMPANY_NAME];
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [COMPANIES_HOUSE_NUMBER]: ({ withSpecialCharacters = false }) => {
    const fieldId = COMPANIES_HOUSE_NUMBER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    let expectedValue = COMPANY[COMPANIES_HOUSE_NUMBER];

    if (withSpecialCharacters) {
      expectedValue = mockCompanies[COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME][COMPANIES_HOUSE_NUMBER];
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [HAS_END_BUYER]: () => {
    const fieldId = HAS_END_BUYER;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [IS_MEMBER_OF_A_GROUP]: () => {
    const fieldId = IS_MEMBER_OF_A_GROUP;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [IS_PARTY_TO_CONSORTIUM]: () => {
    const fieldId = IS_PARTY_TO_CONSORTIUM;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
};

export default checkYourAnswersEligibilitySummaryList;
