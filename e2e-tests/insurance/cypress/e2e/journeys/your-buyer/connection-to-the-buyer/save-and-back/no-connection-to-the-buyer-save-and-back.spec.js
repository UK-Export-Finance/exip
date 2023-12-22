import {
  noRadioInput,
  saveAndBackButton,
  submitButton,
} from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { TASKS } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  YOUR_BUYER: { CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER_ROUTE },
  ALL_SECTIONS,
  ROOT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your buyer - Connection to buyer - No connection to buyer - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});
      cy.completeAndSubmitCompanyOrOrganisationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER_ROUTE}`;

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

    it('should retain the `your buyer` task status as `not started yet`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeConnectionToTheBuyerForm({});

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it('should retain all inputs on the page', () => {
      // get to connection to buyer form
      cy.startInsuranceYourBuyerSection({});
      submitButton().click();

      noRadioInput().should('be.checked');
    });
  });
});
