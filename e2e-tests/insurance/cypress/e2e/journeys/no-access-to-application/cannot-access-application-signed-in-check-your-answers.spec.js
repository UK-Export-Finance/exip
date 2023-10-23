import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { COOKIE } from '../../../../../constants';

const {
  ROOT: INSURANCE_ROOT,
  NO_ACCESS_TO_APPLICATION,
  CHECK_YOUR_ANSWERS: {
    ELIGIBILITY,
    TYPE_OF_POLICY,
    YOUR_BUSINESS,
    YOUR_BUYER,
  },
} = INSURANCE_ROUTES;

const firstAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');
const secondAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');

const baseUrl = Cypress.config('baseUrl');
const insuranceRoute = `${baseUrl}${INSURANCE_ROOT}`;

const cannotAccessUrl = `${baseUrl}${NO_ACCESS_TO_APPLICATION}`;

context('Insurance - no access to application page - signed in - check your answers pages', () => {
  let firstApplicationReferenceNumber;
  let referenceNumbers;

  before(() => {
    cy.saveSession();

    // sign into an account, create an application.
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      firstApplicationReferenceNumber = refNumber;

      referenceNumbers = [refNumber];
    });
  });

  after(() => {
    referenceNumbers.forEach((refNumber) => {
      cy.deleteApplication(refNumber);
    });

    cy.deleteAccount(firstAccountEmail);
    cy.deleteAccount(secondAccountEmail);
  });

  describe('when trying to access a "check your answers" page in an application created by another user', () => {
    before(() => {
      // clear the session - means we are not a signed in user.
      cy.clearCookie(COOKIE.NAME.SESSION);

      // sign into a different accont
      cy.completeSignInAndGoToApplication({ email: secondAccountEmail }).then(({ referenceNumber: refNumber }) => {
        referenceNumbers = [...referenceNumbers, refNumber];
      });
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Check your answers - Eligibility page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${ELIGIBILITY}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Check your answers - Policy page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${TYPE_OF_POLICY}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Check your answers - Your business page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${YOUR_BUSINESS}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Check your answers - Your buyer page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${YOUR_BUYER}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });
  });
});
