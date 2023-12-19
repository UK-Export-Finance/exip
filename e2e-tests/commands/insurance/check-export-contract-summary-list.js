import { summaryList } from '../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../content-strings/fields/insurance/export-contract';
import application from '../../fixtures/application';
import COUNTRIES from '../../fixtures/countries';

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  },
} = INSURANCE_FIELD_IDS;

/**
 * checkExportContractSummaryList
 * "export contract" summary list assertions.
 */
const checkExportContractSummaryList = ({
  [DESCRIPTION]: () => {
    const fieldId = DESCRIPTION;
    const expectedKey = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    const expectedValue = application.EXPORT_CONTRACT[fieldId];

    const expectedChangeLinkText = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
  [FINAL_DESTINATION]: () => {
    const fieldId = FINAL_DESTINATION;
    const expectedKey = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    const country = COUNTRIES.find((c) => c.ISO_CODE === application.EXPORT_CONTRACT[fieldId]);

    const expectedValue = country.NAME;

    const expectedChangeLinkText = FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].SUMMARY.TITLE;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText);
  },
});

export default checkExportContractSummaryList;
