import { ROUTES } from '../../../../../constants';

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    DECLARATIONS: { HOW_YOUR_DATA_WILL_BE_USED },
  },
} = ROUTES;

context('Insurance - Declarations - How your data will be used page - submit without a completed application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`;

      // go to the `how your data will be used` page
      cy.navigateToUrl(url);

      cy.url().should('eq', url);

      // complete and submit the form (therefore submitting an incomplete application)
      // NOTE: this is a temporary test - in a future PR, this will be locked down so it cannot be acessed without completing other forms.
      cy.completeAndSubmitDeclarationHowYourDataWillBeUsed();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
    const expectedUrl = `${Cypress.config('baseUrl')}${PROBLEM_WITH_SERVICE}`;

    cy.url().should('eq', expectedUrl);
  });
});
