import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    PRIVATE_MARKET_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - How you will get paid - With total contract value over threshold', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({ totalContractValueOverThreshold: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

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
    describe('form submission with a new answer', () => {
      const newAnswer = 'Mock new description';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitHowYouWillGetPaidForm({
          paymentTermsDescription: newAnswer,
        });
      });

      it(`should redirect to ${PRIVATE_MARKET_CHANGE}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: PRIVATE_MARKET_CHANGE, fieldId: FIELD_ID });
      });

      it('should render the new answer', () => {
        /**
         * Submit the PRIVATE_MARKET form,
         * to get back to CHECK_YOUR_ANSWERS.
         */
        cy.clickSubmitButton();

        cy.assertSummaryListRowValue(summaryList, FIELD_ID, newAnswer);
      });
    });
  });
});
