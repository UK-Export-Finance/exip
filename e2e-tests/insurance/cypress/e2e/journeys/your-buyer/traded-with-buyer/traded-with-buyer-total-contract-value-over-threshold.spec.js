import { ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const {
  YOUR_BUYER: {
    TRADED_WITH_BUYER, TRADING_HISTORY, CREDIT_INSURANCE_COVER,
  },
} = ROUTES.INSURANCE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Traded with buyer page - Submission with total contract value over threshold', () => {
  let referenceNumber;
  let url;
  let tradingHistoryUrl;
  let creditInsuranceCoverUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`;
      tradingHistoryUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY}`;
      creditInsuranceCoverUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting the form as "no"', () => {
    it(`should redirect to ${CREDIT_INSURANCE_COVER} page`, () => {
      cy.completeAndSubmitTradedWithBuyerForm({});

      cy.assertUrl(creditInsuranceCoverUrl);
    });
  });

  describe('when submitting the form as "yes"', () => {
    it(`should redirect to ${TRADING_HISTORY} page`, () => {
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

      cy.assertUrl(tradingHistoryUrl);
    });
  });
});
