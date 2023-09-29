import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { COOKIE } from '../../../../../constants';

const {
  ROOT,
  ALL_SECTIONS,
  NO_ACCESS_TO_APPLICATION,
} = INSURANCE_ROUTES;

const firstAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');
const secondAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');

context('Insurance - no access to application page - signed in', () => {
  let referenceNumbers;
  let firstApplicationUrl;

  before(() => {
    cy.saveSession();

    // sign into an account, create an application.
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumbers = [refNumber];

      firstApplicationUrl = `${Cypress.config('baseUrl')}${ROOT}/${refNumber}${ALL_SECTIONS}`;
    });
  });

  after(() => {
    referenceNumbers.forEach((refNumber) => {
      cy.deleteApplication(refNumber);
    });

    cy.deleteAccount(firstAccountEmail);
    cy.deleteAccount(secondAccountEmail);
  });

  describe('when trying to access an application created by another user', () => {
    beforeEach(() => {
      // clear the session - means we are not a signed in user.
      cy.clearCookie(COOKIE.NAME.SESSION);

      // sign into a different accont
      cy.completeSignInAndGoToApplication({ email: secondAccountEmail }).then((refNumber) => {
        referenceNumbers = [...referenceNumbers, refNumber];

        cy.navigateToUrl(firstApplicationUrl);
      });
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${NO_ACCESS_TO_APPLICATION}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
