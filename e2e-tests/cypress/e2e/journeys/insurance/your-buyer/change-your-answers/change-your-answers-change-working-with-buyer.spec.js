import partials from '../../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { workingWithBuyerPage, checkYourAnswersPage } from '../../../../pages/insurance/your-buyer';
import { submitButton } from '../../../../pages/shared';

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
  YOUR_BUYER: {
    WORKING_WITH_BUYER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
  START,
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

const { summaryList } = checkYourAnswersPage;

context('Insurance - Your buyer - Change your answers - Company or organisation - As an exporter, I want to change my answers to the company or organisation section', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyOrOrganisationForm();
    cy.completeAndSubmitWorkingWithBuyerForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe(CONNECTED_WITH_BUYER, () => {
    const fieldId = CONNECTED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${WORKING_WITH_BUYER_CHANGE}`, () => {
        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, WORKING_WITH_BUYER_CHANGE, CONNECTED_WITH_BUYER);
      });
    });

    describe('form submission with a new answer', () => {
      before(() => {
        workingWithBuyerPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, 'No');
      });
    });
  });

  describe(TRADED_WITH_BUYER, () => {
    const fieldId = TRADED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${WORKING_WITH_BUYER_CHANGE}`, () => {
        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, WORKING_WITH_BUYER_CHANGE, TRADED_WITH_BUYER);
      });
    });

    describe('form submission with a new answer', () => {
      before(() => {
        workingWithBuyerPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, 'No');
      });
    });
  });
});
