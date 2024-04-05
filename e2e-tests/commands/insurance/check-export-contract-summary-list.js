import { summaryList } from '../../pages/shared';
import getSummaryListField from './get-summary-list-field';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../content-strings/fields/insurance/export-contract';
import application from '../../fixtures/application';
import COUNTRIES from '../../fixtures/countries';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = FIELD_IDS;

/**
 * checkExportContractSummaryList
 * "export contract" summary list assertions.
 */
const checkExportContractSummaryList = ({
  [DESCRIPTION]: () => {
    const fieldId = DESCRIPTION;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.ABOUT_GOODS_OR_SERVICES);

    const expectedValue = application.EXPORT_CONTRACT[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [FINAL_DESTINATION]: () => {
    const fieldId = FINAL_DESTINATION;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.ABOUT_GOODS_OR_SERVICES);

    const country = COUNTRIES.find((c) => c.ISO_CODE === application.EXPORT_CONTRACT[fieldId]);

    const expectedValue = country.NAME;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [PAYMENT_TERMS_DESCRIPTION]: () => {
    const fieldId = PAYMENT_TERMS_DESCRIPTION;

    const { expectedKey, expectedChangeLinkText } = getSummaryListField(fieldId, FIELDS.HOW_WILL_YOU_GET_PAID);

    const expectedValue = application.EXPORT_CONTRACT.HOW_WILL_YOU_GET_PAID[fieldId];

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkExportContractSummaryList;
