import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY, CREDIT_INSURANCE_COVER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Trading history page - Submission with total contract value over threshold', () => {
  let referenceNumber;
  let url;
  let creditInsuranceCoverUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;
      creditInsuranceCoverUrl = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`;

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${CREDIT_INSURANCE_COVER} page on form submission`, () => {
    cy.completeAndSubmitTradingHistoryWithBuyerForm({});

    cy.assertUrl(creditInsuranceCoverUrl);
  });
});
