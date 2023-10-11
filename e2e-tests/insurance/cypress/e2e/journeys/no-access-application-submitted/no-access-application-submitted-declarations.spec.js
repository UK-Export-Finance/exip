import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
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
  NO_ACCESS_APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');
const insuranceRoute = `${baseUrl}${INSURANCE_ROOT}`;

const noAccessApplicationSubmittedUrl = `${baseUrl}${NO_ACCESS_APPLICATION_SUBMITTED}`;

context('Insurance - no access to application when application is submitted - declarations pages', () => {
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

  describe('when trying to access a "declarations" page in an application that is already submitted', () => {
    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Declarations - Confidentiality page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${CONFIDENTIALITY}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Declarations - Anti-bribery page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${ANTI_BRIBERY_ROOT}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Declarations - Anti-bribery - Code of conduct page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${CODE_OF_CONDUCT}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Declarations - Anti-bribery - Exporting with code of conduct page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Declarations - Confirmation and acknowledgements page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED} when navigating to the Declarations - How your data will be used page directly`, () => {
      const url = `${insuranceRoute}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`;

      cy.navigateToUrl(url);

      cy.assertUrl(noAccessApplicationSubmittedUrl);
    });
  });
});
