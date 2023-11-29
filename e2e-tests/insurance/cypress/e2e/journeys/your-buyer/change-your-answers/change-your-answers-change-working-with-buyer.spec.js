import partials from '../../../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { workingWithBuyerPage } from '../../../../../../pages/insurance/your-buyer';
import { submitButton, summaryList } from '../../../../../../pages/shared';

const {
  INSURANCE: {
    YOUR_BUYER: {
      WORKING_WITH_BUYER: {
        CONNECTED_WITH_BUYER,
        TRADED_WITH_BUYER,
      },
    },
  },
} = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    WORKING_WITH_BUYER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your buyer - Change your answers - Company or organisation - As an exporter, I want to change my answers to the company or organisation section', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitWorkingWithBuyerForm({});

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(CONNECTED_WITH_BUYER, () => {
    const fieldId = CONNECTED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${WORKING_WITH_BUYER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, WORKING_WITH_BUYER_CHANGE, CONNECTED_WITH_BUYER);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        workingWithBuyerPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });
    });
  });

  describe(TRADED_WITH_BUYER, () => {
    const fieldId = TRADED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${WORKING_WITH_BUYER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, WORKING_WITH_BUYER_CHANGE, TRADED_WITH_BUYER);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        workingWithBuyerPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });
    });
  });
});
