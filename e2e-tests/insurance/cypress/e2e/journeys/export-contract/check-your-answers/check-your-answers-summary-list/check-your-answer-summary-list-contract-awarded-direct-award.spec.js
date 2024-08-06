import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertMinimalExportContractSummaryListRows } from '../../../../../../../shared-test-assertions';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';

const { ROOT, EXPORT_CONTRACT } = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD },
} = FIELD_IDS;

const { DIRECT_AWARD } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD].OPTIONS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Export contract - Check your answers - Summary list - contract awarded with ${DIRECT_AWARD.TEXT}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({ contractAwardedDirectAward: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT.CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  assertMinimalExportContractSummaryListRows({ awardMethodValue: DIRECT_AWARD.TEXT });
});
