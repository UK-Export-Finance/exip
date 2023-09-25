import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: {
    ELIGIBILITY,
    TYPE_OF_POLICY,
    YOUR_BUSINESS,
    YOUR_BUYER,
  },
  NO_ACCESS_APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');
const insuranceRoute = `${baseUrl}${INSURANCE_ROOT}`;

const noAccessApplicationSubmittedUrl = `${baseUrl}${NO_ACCESS_APPLICATION_SUBMITTED}`;

context('Insurance - no access to application when application is submitted - check yor answers pages', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({}).then((refNumber) => {
      referenceNumber = refNumber;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when trying to access a "check your answers" page in an application that is already submitted', () => {
    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Check your answers - Eligibility page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${ELIGIBILITY}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Check your answers - Policy and exports page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${TYPE_OF_POLICY}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Check your answers - Your business page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${YOUR_BUSINESS}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Check your answers - Your buyer page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${YOUR_BUYER}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });
  });
});
