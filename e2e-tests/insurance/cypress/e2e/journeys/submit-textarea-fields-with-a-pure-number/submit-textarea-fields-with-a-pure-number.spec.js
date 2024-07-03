import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../constants/field-ids/insurance';
import { field } from '../../../../../pages/shared';

const {
  ROOT,
  YOUR_BUYER: { CONNECTION_WITH_BUYER },
  EXPORT_CONTRACT: { AGENT_SERVICE, HOW_WILL_YOU_GET_PAID },
  POLICY: {
    BROKER_DETAILS_ROOT, PRE_CREDIT_PERIOD, LOSS_PAYEE_DETAILS_ROOT, OTHER_COMPANY_DETAILS,
  },
} = INSURANCE_ROUTES;

const {
  EXPORT_CONTRACT: {
    HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
    AGENT_SERVICE: { SERVICE_DESCRIPTION },
  },
  YOUR_BUYER: { CONNECTION_WITH_BUYER_DESCRIPTION },
  POLICY: {
    BROKER_DETAILS: { NAME: BROKER_NAME, FULL_ADDRESS },
    CREDIT_PERIOD_WITH_BUYER,
    REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME },
    FINANCIAL_ADDRESS,
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const numberString = '1';

context('Insurance - Textarea fields - Textarea fields should be able to submit after entering a pure number', () => {
  let referenceNumber;
  let connectionToTheBuyerUrl;
  let agentServiceUrl;
  let howWillYouGetPaidUrl;
  let brokerDetailsUrl;
  let preCreditPeriodUrl;
  let lossPayeeDetailsUrl;
  let otherCompanyUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      connectionToTheBuyerUrl = `${baseUrl}${ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER}`;
      agentServiceUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_SERVICE}`;
      howWillYouGetPaidUrl = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`;
      brokerDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;
      preCreditPeriodUrl = `${baseUrl}${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;
      lossPayeeDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;
      otherCompanyUrl = `${baseUrl}${ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(CONNECTION_WITH_BUYER_DESCRIPTION, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(connectionToTheBuyerUrl);

        cy.completeAndSubmitConnectionWithTheBuyerForm({
          hasConnectionToBuyer: true,
          description: numberString,
        });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkTextareaValue({
          fieldId: CONNECTION_WITH_BUYER_DESCRIPTION,
          expectedValue: numberString,
        });
      });
    });
  });

  describe(SERVICE_DESCRIPTION, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(agentServiceUrl);

        cy.completeAndSubmitAgentServiceForm({
          serviceDescription: numberString,
        });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkTextareaValue({
          fieldId: SERVICE_DESCRIPTION,
          expectedValue: numberString,
        });
      });
    });
  });

  describe(PAYMENT_TERMS_DESCRIPTION, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(howWillYouGetPaidUrl);

        cy.completeAndSubmitHowYouWillGetPaidForm({ paymentTermsDescription: numberString });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkTextareaValue({
          fieldId: PAYMENT_TERMS_DESCRIPTION,
          expectedValue: numberString,
        });
      });
    });
  });

  describe(`${BROKER_NAME} and ${FULL_ADDRESS}`, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(brokerDetailsUrl);

        cy.completeAndSubmitBrokerDetailsForm({
          name: numberString,
          fullAddress: numberString,
        });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkValue(field(BROKER_NAME), numberString);

        cy.checkTextareaValue({
          fieldId: FULL_ADDRESS,
          expectedValue: numberString,
        });
      });
    });
  });

  describe(CREDIT_PERIOD_WITH_BUYER, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(preCreditPeriodUrl);

        cy.completeAndSubmitPreCreditPeriodForm({
          needPreCreditPeriod: true,
          description: numberString,
        });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkTextareaValue({
          fieldId: CREDIT_PERIOD_WITH_BUYER,
          expectedValue: numberString,
        });
      });
    });
  });

  describe(FINANCIAL_ADDRESS, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(lossPayeeDetailsUrl);

        cy.completeAndSubmitLossPayeeDetailsForm({});
        cy.completeAndSubmitLossPayeeFinancialDetailsUkForm({ financialAddress: numberString });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkTextareaValue({
          fieldId: FINANCIAL_ADDRESS,
          expectedValue: numberString,
        });
      });
    });
  });

  describe(COMPANY_NAME, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(otherCompanyUrl);

        cy.completeAndSubmitOtherCompanyDetailsForm({ companyName: numberString });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkValue(field(COMPANY_NAME), numberString);
      });
    });
  });
});
