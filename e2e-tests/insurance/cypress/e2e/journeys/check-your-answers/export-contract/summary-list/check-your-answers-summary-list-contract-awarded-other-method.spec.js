import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertMinimalExportContractSummaryListRows } from '../../../../../../../shared-test-assertions';
import application from '../../../../../../../fixtures/application';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/export-contract';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { OTHER_AWARD_METHOD, AWARD_METHOD },
} = FIELD_IDS;

const { OTHER } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD].OPTIONS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Check your answers - Export contract - Summary list - Contract awarded with ${OTHER.TEXT}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber, contractAwardedOtherMethod: true });

      cy.clickTaskCheckAnswers();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 3 });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;
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
});
