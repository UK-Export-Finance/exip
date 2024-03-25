import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  EXPORT_CONTRACT: { PRIVATE_MARKET },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - How will you get paid page - Submission with total contract value over threshold', () => {
  let referenceNumber;
  let privateMarketUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});

      privateMarketUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${PRIVATE_MARKET} on form submission`, () => {
    cy.completeAndSubmitHowYouWillGetPaidForm({});

    cy.assertUrl(privateMarketUrl);
  });
});
