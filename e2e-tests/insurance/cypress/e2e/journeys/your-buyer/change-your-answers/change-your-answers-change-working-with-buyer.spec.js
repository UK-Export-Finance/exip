import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { summaryList, noRadioInput } from '../../../../../../pages/shared';
import application from '../../../../../../fixtures/application';

const {
  INSURANCE: {
    YOUR_BUYER: {
      CONNECTION_WITH_BUYER,
      CONNECTION_WITH_BUYER_DESCRIPTION,
      TRADED_WITH_BUYER,
    },
  },
} = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    TRADED_WITH_BUYER_CHANGE,
    CONNECTION_WITH_BUYER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { BUYER } = application;

context('Insurance - Your buyer - Change your answers - Company or organisation - As an exporter, I want to change my answers to the company or organisation section', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({});
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

  describe(CONNECTION_WITH_BUYER, () => {
    const fieldId = CONNECTION_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${CONNECTION_WITH_BUYER}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CONNECTION_WITH_BUYER_CHANGE, fieldId: CONNECTION_WITH_BUYER });
      });
    });

    describe(`form submission with a new answer - ${CONNECTION_WITH_BUYER} as yes`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitConnectionToTheBuyerForm({ hasConnectionToBuyer: true });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
        cy.assertSummaryListRowValue(summaryList, CONNECTION_WITH_BUYER_DESCRIPTION, BUYER[CONNECTION_WITH_BUYER_DESCRIPTION]);
      });
    });

    describe(`form submission with a new answer - ${CONNECTION_WITH_BUYER} as no`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitConnectionToTheBuyerForm({});
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });

      it(`should not render the new answer for ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
        cy.assertSummaryListRowDoesNotExist(summaryList, CONNECTION_WITH_BUYER_DESCRIPTION);
      });
    });
  });

  describe(TRADED_WITH_BUYER, () => {
    const fieldId = TRADED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TRADED_WITH_BUYER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TRADED_WITH_BUYER_CHANGE, fieldId: TRADED_WITH_BUYER });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        noRadioInput().click();

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });
    });
  });
});
