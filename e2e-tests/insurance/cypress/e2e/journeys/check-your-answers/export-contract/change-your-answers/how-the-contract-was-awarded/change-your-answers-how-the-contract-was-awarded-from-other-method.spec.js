import { summaryList, radios, field } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../../content-strings/fields/insurance/export-contract';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD: FIELD_ID, OTHER_AWARD_METHOD },
} = FIELD_IDS;

const { DIRECT_AWARD, OTHER } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[FIELD_ID].OPTIONS;

const baseUrl = Cypress.config('baseUrl');

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context(
  `Insurance - Export contract - Change your answers - How the contract was awarded - Changing from ${OTHER.TEXT} to ${DIRECT_AWARD.TEXT} and back to ${OTHER.TEXT}`,
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({
          referenceNumber,
          contractAwardedOtherMethod: true,
        });

        task.link().click();

        // To get past previous "Check your answers" pages
        cy.completeAndSubmitMultipleCheckYourAnswers({ count: 3 });

        url = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;

        cy.assertUrl(url);
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
          cy.navigateToUrl(url);

          // select DIRECT_AWARD
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
