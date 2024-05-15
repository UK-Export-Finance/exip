import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { summaryList } from '../../../../../../pages/shared';
import application from '../../../../../../fixtures/application';

const {
  CONNECTION_WITH_BUYER,
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = YOUR_BUYER_FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    CONNECTION_WITH_BUYER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const { BUYER } = application;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Change your answers - Connection to the buyer - As an exporter, I want to change my answers to the connection to the buyer section', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({});
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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

        cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: true });
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

        cy.completeAndSubmitConnectionWithTheBuyerForm({});
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });

      it(`should NOT render the new answer for ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
        cy.assertSummaryListRowDoesNotExist(summaryList, CONNECTION_WITH_BUYER_DESCRIPTION);
      });
    });
  });
});
