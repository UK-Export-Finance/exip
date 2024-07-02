import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import { EXPECTED_SINGLE_LINE_STRING, FIELD_VALUES } from '../../constants';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../content-strings/fields/insurance/export-contract';
import formatCurrency from '../../helpers/format-currency';
import application from '../../fixtures/application';
import COUNTRIES from '../../fixtures/countries';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
  AGENT_CHARGES: {
    FIXED_SUM_AMOUNT,
    FIXED_SUM_CURRENCY_CODE,
    PERCENTAGE_CHARGE,
    PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

/**
 * checkExportContractSummaryList
 * "export contract" summary list assertions.
 */
const checkExportContractSummaryList = {
  [DESCRIPTION]: () => {
    const fieldId = DESCRIPTION;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.ABOUT_GOODS_OR_SERVICES);

    const expectedValue = application.EXPORT_CONTRACT[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [FINAL_DESTINATION]: ({ isKnown = false }) => {
    const fieldId = FINAL_DESTINATION;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.ABOUT_GOODS_OR_SERVICES);

    let expectedValue;

    if (isKnown) {
      const country = COUNTRIES.find((c) => c.ISO_CODE === application.EXPORT_CONTRACT[fieldId]);

      expectedValue = country.NAME;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      const fieldStrings = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY;

      const expectedLinkText = `${fieldStrings.TITLE} (${fieldStrings.FORM_TITLE})`;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedLinkText);
    }
  },
  [PAYMENT_TERMS_DESCRIPTION]: () => {
    const fieldId = PAYMENT_TERMS_DESCRIPTION;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS.HOW_WILL_YOU_GET_PAID);

    const row = summaryList.field(fieldId);

    cy.checkText(row.key(), expectedKey);

    row.value().contains(EXPECTED_SINGLE_LINE_STRING);

    const expectedLineBreaks = 3;

    cy.assertLength(row.valueHtmlLineBreak(), expectedLineBreaks);
  },
  [ATTEMPTED]: ({ isYes = false, shouldRender = false }) => {
    const fieldId = ATTEMPTED;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.PRIVATE_MARKET);

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
  [DECLINED_DESCRIPTION]: ({ shouldRender = false }) => {
    const fieldId = DECLINED_DESCRIPTION;

    if (shouldRender) {
      const { expectedKey } = getSummaryListField(fieldId, FIELDS.PRIVATE_MARKET);

      const row = summaryList.field(fieldId);

      cy.checkText(row.key(), expectedKey);

      row.value().contains(EXPECTED_SINGLE_LINE_STRING);

      const expectedLineBreaks = 3;

      cy.assertLength(row.valueHtmlLineBreak(), expectedLineBreaks);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [USING_AGENT]: ({ isYes = false }) => {
    const fieldId = USING_AGENT;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS);

    let expectedValue;

    if (isYes) {
      expectedValue = FIELD_VALUES.YES;
    } else {
      expectedValue = FIELD_VALUES.NO;
    }

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [NAME]: ({ shouldRender = false }) => {
    const fieldId = NAME;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.AGENT_DETAILS);

      const expectedValue = application.EXPORT_CONTRACT.AGENT_DETAILS[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [FULL_ADDRESS]: ({ shouldRender = false }) => {
    const fieldId = FULL_ADDRESS;

    if (shouldRender) {
      const { expectedKey } = getSummaryListField(fieldId, FIELDS.AGENT_DETAILS);

      const row = summaryList.field(fieldId);

      cy.checkText(row.key(), expectedKey);

      row.value().contains(EXPECTED_SINGLE_LINE_STRING);

      const expectedLineBreaks = 3;

      cy.assertLength(row.valueHtmlLineBreak(), expectedLineBreaks);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [COUNTRY_CODE]: ({ shouldRender = false }) => {
    const fieldId = COUNTRY_CODE;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.AGENT_DETAILS);

      const expectedValue = application.EXPORT_CONTRACT.AGENT_DETAILS[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [SERVICE_DESCRIPTION]: ({ shouldRender = false, newAnswer }) => {
    const fieldId = SERVICE_DESCRIPTION;

    if (shouldRender) {
      const { expectedKey } = getSummaryListField(fieldId, FIELDS.AGENT_SERVICE);

      const row = summaryList.field(fieldId);

      cy.checkText(row.key(), expectedKey);

      row.value().contains(EXPECTED_SINGLE_LINE_STRING);

      if (newAnswer) {
        row.value().contains(newAnswer);
      }

      const expectedLineBreaks = 3;

      cy.assertLength(row.valueHtmlLineBreak(), expectedLineBreaks);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [IS_CHARGING]: ({ isYes = false, shouldRender = false }) => {
    const fieldId = IS_CHARGING;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.AGENT_SERVICE);

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
  [FIXED_SUM_AMOUNT]: ({ shouldRender = false, agentChargeFixedSumAmount }) => {
    const fieldId = FIXED_SUM_AMOUNT;

    if (shouldRender) {
      const currencyCode = application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_CURRENCY_CODE];

      let expectedValue = formatCurrency(application.EXPORT_CONTRACT.AGENT_CHARGES[fieldId], currencyCode);

      if (agentChargeFixedSumAmount) {
        expectedValue = formatCurrency(agentChargeFixedSumAmount, currencyCode, 2);
      }

      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.AGENT_CHARGES);

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [PERCENTAGE_CHARGE]: ({ shouldRender = false }) => {
    const fieldId = PERCENTAGE_CHARGE;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.AGENT_CHARGES);

      const expectedValue = `${application.EXPORT_CONTRACT.AGENT_CHARGES[fieldId]}%`;

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
  [PAYABLE_COUNTRY_CODE]: ({ shouldRender = false }) => {
    const fieldId = PAYABLE_COUNTRY_CODE;

    if (shouldRender) {
      const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.AGENT_CHARGES);

      const expectedValue = application.EXPORT_CONTRACT.AGENT_CHARGES[fieldId];

      cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
    } else {
      cy.assertSummaryListRowDoesNotExist(summaryList, fieldId);
    }
  },
};

export default checkExportContractSummaryList;
