import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertMinimalExportContractSummaryListRows } from '../../../../../../../shared-test-assertions';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import application from '../../../../../../../fixtures/application';

const { ROOT, EXPORT_CONTRACT } = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { OTHER_AWARD_METHOD },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - Check your answers - Summary list - application under total contract value threshold, no private insurance attempt, not using an agent, contracted awarded other method',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeExportContractSection({ contractAwardedOtherMethod: true });

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

    assertMinimalExportContractSummaryListRows({ awardMethodValue: application.EXPORT_CONTRACT[OTHER_AWARD_METHOD] });
  },
);
