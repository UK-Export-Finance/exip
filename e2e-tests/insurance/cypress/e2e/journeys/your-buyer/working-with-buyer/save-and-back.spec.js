import { saveAndBackButton, submitButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { workingWithBuyerPage } from '../../../../../../pages/insurance/your-buyer';
import { TASKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';

const {
  WORKING_WITH_BUYER: {
    CONNECTED_WITH_BUYER,
    TRADED_WITH_BUYER,
  },
} = FIELD_IDS;

const {
  ROOT,
  ALL_SECTIONS,
  YOUR_BUYER: {
    WORKING_WITH_BUYER,
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

      cy.startInsuranceYourBuyerSection();

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`;

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

  describe('when submitting a partially entered form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      workingWithBuyerPage[CONNECTED_WITH_BUYER].yesRadioInput().click();

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${CONNECTED_WITH_BUYER} radio button selection and the other fields should be empty`, () => {
      cy.startInsuranceYourBuyerSection();

      // submit button to get to working with buyer page
      submitButton().click();

      workingWithBuyerPage[CONNECTED_WITH_BUYER].yesRadioInput().should('be.checked');
      workingWithBuyerPage[TRADED_WITH_BUYER].yesRadioInput().should('not.be.checked');
      workingWithBuyerPage[TRADED_WITH_BUYER].noRadioInput().should('not.be.checked');
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      workingWithBuyerPage[CONNECTED_WITH_BUYER].yesRadioInput().click();
      workingWithBuyerPage[TRADED_WITH_BUYER].noRadioInput().click();

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
      cy.startInsuranceYourBuyerSection();

      // submit button to get to working with buyer page
      submitButton().click();

      workingWithBuyerPage[CONNECTED_WITH_BUYER].yesRadioInput().should('be.checked');
      workingWithBuyerPage[TRADED_WITH_BUYER].noRadioInput().should('be.checked');
    });
  });
});
