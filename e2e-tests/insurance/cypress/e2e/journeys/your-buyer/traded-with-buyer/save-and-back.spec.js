import { saveAndBackButton, submitButton, yesRadioInput } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  YOUR_BUYER: {
    TRADED_WITH_BUYER,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.buyer;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Working with buyer - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeTradedWithBuyerForm({ hasTradedWithBuyer: true });
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `completed`', () => {
      const expected = TASKS.STATUS.COMPLETED;
      cy.checkText(task.status(), expected);
    });

    it('should retain all inputs on the page', () => {
      cy.startInsuranceYourBuyerSection({});

      // submit button to get to working with buyer page
      submitButton().click();
      // submit connectionToBuyer form to get to working with buyer page
      cy.completeAndSubmitConnectionToTheBuyerForm({});

      yesRadioInput().should('be.checked');
    });
  });
});
