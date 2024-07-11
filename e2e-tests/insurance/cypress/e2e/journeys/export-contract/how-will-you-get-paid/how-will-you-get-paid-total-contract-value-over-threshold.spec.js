import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
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

      privateMarketUrl = `${baseUrl}${ROOT}/${referenceNumber}${PRIVATE_MARKET}`;
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

  it('should retain the status of task `export contract` as `in progress`', () => {
    cy.navigateToAllSectionsUrl(referenceNumber);

    cy.checkTaskExportContractStatusIsInProgress();
  });
});
