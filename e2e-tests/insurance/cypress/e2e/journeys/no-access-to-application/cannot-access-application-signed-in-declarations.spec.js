import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { COOKIE } from '../../../../../constants';

const {
  ROOT: INSURANCE_ROOT,
  NO_ACCESS_TO_APPLICATION,
  DECLARATIONS: {
    CONFIDENTIALITY,
    ANTI_BRIBERY: {
      ROOT: ANTI_BRIBERY_ROOT,
      CODE_OF_CONDUCT,
      EXPORTING_WITH_CODE_OF_CONDUCT,
    },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    HOW_YOUR_DATA_WILL_BE_USED,
  },
} = INSURANCE_ROUTES;

const firstAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');
const secondAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');

const baseUrl = Cypress.config('baseUrl');
const insuranceRoute = `${baseUrl}${INSURANCE_ROOT}`;

const cannotAccessUrl = `${baseUrl}${NO_ACCESS_TO_APPLICATION}`;

context('Insurance - no access to application page - signed in - declarations pages', () => {
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

  describe('when trying to access a "declarations" page in an application created by another user', () => {
    before(() => {
      // clear the session - means we are not a signed in user.
      cy.clearCookie(COOKIE.NAME.SESSION);

      // sign into a different accont
      cy.completeSignInAndGoToApplication({ email: secondAccountEmail }).then((refNumber) => {
        referenceNumbers = [...referenceNumbers, refNumber];
      });
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Declarations - Confidentiality page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${CONFIDENTIALITY}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Declarations - Anti-bribery page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${ANTI_BRIBERY_ROOT}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Declarations - Anti-bribery - Code of conduct page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${CODE_OF_CONDUCT}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Declarations - Anti-bribery - Exporting with code of conduct page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Declarations - Confirmation and acknowledgements page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION} when navigating to the Declarations - How your data will be used page directly`, () => {
      const url = `${insuranceRoute}/${firstApplicationReferenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`;

      cy.navigateToUrl(url);

      cy.assertUrl(cannotAccessUrl);
    });
  });
});
