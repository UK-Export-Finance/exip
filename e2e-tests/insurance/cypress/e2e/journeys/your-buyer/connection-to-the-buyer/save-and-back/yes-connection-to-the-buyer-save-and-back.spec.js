import {
  saveAndBackButton,
  submitButton,
  yesRadioInput,
  field,
} from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { TASKS } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../../fixtures/application';

const {
  WORKING_WITH_BUYER: {
    CONNECTION_WITH_BUYER_DESCRIPTION,
  },
} = YOUR_BUYER_FIELD_IDS;

const {
  YOUR_BUYER: { CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER_ROUTE },
  ALL_SECTIONS,
  ROOT,
} = INSURANCE_ROUTES;

const { YOUR_BUYER } = application;

const baseUrl = Cypress.config('baseUrl');

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your buyer - Connection to buyer - Has connection to buyer - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection();
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

  describe('when submitting a partially filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeConnectionToTheBuyerForm({});

      yesRadioInput().click();

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it('should retain completed input on the page', () => {
      // get to connection to buyer form
      cy.startInsuranceYourBuyerSection();
      submitButton().click();

      yesRadioInput().should('be.checked');
      cy.checkText(field(CONNECTION_WITH_BUYER_DESCRIPTION).textarea(), '');
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeConnectionToTheBuyerForm({ hasConnectionToBuyer: true });

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
      cy.startInsuranceYourBuyerSection();
      submitButton().click();

      yesRadioInput().should('be.checked');
      cy.checkText(field(CONNECTION_WITH_BUYER_DESCRIPTION).textarea(), YOUR_BUYER[CONNECTION_WITH_BUYER_DESCRIPTION]);
    });
  });
});
