import { summaryList, radios, field } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/export-contract';

const {
  ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD: FIELD_ID, OTHER_AWARD_METHOD },
} = FIELD_IDS;

const { DIRECT_AWARD, OTHER } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[FIELD_ID].OPTIONS;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Export contract - Change your answers - How the contract was awarded - Changing from ${OTHER.TEXT} to ${DIRECT_AWARD.TEXT} and back to ${OTHER.TEXT}`,
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeExportContractSection({ contractAwardedOtherMethod: true });

        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        cy.assertUrl(checkYourAnswersUrl);
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe(FIELD_ID, () => {
      describe(`after changing the answer from ${OTHER.TEXT} to ${DIRECT_AWARD.TEXT} and back to ${OTHER.TEXT}`, () => {
        beforeEach(() => {
          cy.navigateToUrl(checkYourAnswersUrl);

          // change to DIRECT_AWARD
          summaryList.field(FIELD_ID).changeLink().click();
          cy.completeAndSubmitHowWasTheContractAwardedForm({ directAward: true });

          // select OTHER
          summaryList.field(FIELD_ID).changeLink().click();
          const selector = radios(OTHER.ID).option;
          selector.label().click();
        });

        it(`should have no value for ${OTHER_AWARD_METHOD} text input`, () => {
          cy.checkValue(field(OTHER_AWARD_METHOD), '');
        });
      });
    });
  },
);
