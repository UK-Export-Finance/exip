import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  ACCOUNT: { CREATE: { YOUR_DETAILS } },
  ALL_SECTIONS,
  DASHBOARD,
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Create - Your details page - Already signed in', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${DASHBOARD} when visiting ${YOUR_DETAILS}`, () => {
    cy.navigateToUrl(YOUR_DETAILS);

    const expectedUrl = `${baseUrl}${DASHBOARD}`;

    cy.assertUrl(expectedUrl);
  });
});
