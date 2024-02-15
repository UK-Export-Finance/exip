import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { summaryList } from '../../../../../../pages/shared';
import application from '../../../../../../fixtures/application';

const {
  INSURANCE: {
    YOUR_BUYER: {
      PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
      HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    },
  },
} = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    CREDIT_INSURANCE_COVER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { BUYER } = application;

context('Insurance - Your buyer - Change your answers - Credit insurance history - As an exporter, I want to change my answers to the credit insurance history section', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({});
      cy.completeAndSubmitCreditInsuranceCoverForm({});
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`change ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} from no to yes`, () => {
    const fieldId = HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${CREDIT_INSURANCE_COVER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CREDIT_INSURANCE_COVER_CHANGE, fieldId });
      });
    });

    describe(`form submission with a new answer - ${fieldId} as yes`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitCreditInsuranceCoverForm({ hasHadCreditInsuranceCover: true });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${fieldId}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
      });

      it(`should render the new answer for ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
        cy.assertSummaryListRowValue(summaryList, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, BUYER[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]);
      });
    });

    describe(`form submission with a new answer - ${fieldId} as no`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitConnectionToTheBuyerForm({});
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${fieldId}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });

      it(`should not render the new answer for ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
        cy.assertSummaryListRowDoesNotExist(summaryList, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER);
      });
    });
  });
});
