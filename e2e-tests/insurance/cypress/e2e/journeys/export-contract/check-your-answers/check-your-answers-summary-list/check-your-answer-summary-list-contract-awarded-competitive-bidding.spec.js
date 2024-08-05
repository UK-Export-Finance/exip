import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertMinimalExportContractSummaryListRows } from '../../../../../../../shared-test-assertions';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';

const { ROOT, EXPORT_CONTRACT } = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD },
} = FIELD_IDS;

const { COMPETITIVE_BIDDING } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD].OPTIONS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - Check your answers - Summary list - application under total contract value threshold, no private insurance attempt, not using an agent, contracted awarded competitive bidding',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeExportContractSection({ contractAwardedCompetitiveBidding: true });

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

    assertMinimalExportContractSummaryListRows({ awardMethodValue: COMPETITIVE_BIDDING.TEXT });
  },
);
