import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  YOUR_BUYER: { FAILED_TO_PAY, CREDIT_INSURANCE_COVER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Failed to pay on time page - total contract value over threshold', () => {
  let referenceNumber;
  let url;
  let creditInsuranceCoverUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${FAILED_TO_PAY}`;
      creditInsuranceCoverUrl = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`;

      cy.completeAndSubmitYourBuyerForms({ stopSubmittingAfter: 'outstandingOrOverduePayments', exporterHasTradedWithBuyer: true, outstandingPayments: true });

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
