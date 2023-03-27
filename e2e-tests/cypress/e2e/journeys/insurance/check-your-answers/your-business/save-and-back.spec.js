import {
  headingCaption,
  status,
  submitButton,
  saveAndBackButton,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import { BUTTONS, PAGES, TASKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  START,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
    YOUR_BUSINESS,
    YOUR_BUYER,
  },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Your business page - Save and back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      task.link().click();

      // to get past eligibility check your answers page
      submitButton().click();
      // to get past policy and exports check your answers page
      submitButton().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

      allSectionsUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it(`should redirect to ${ALL_SECTIONS}`, () => {
    saveAndBackButton().click();

    cy.url().should('eq', allSectionsUrl);
  });

  it('should retain the status of task `check your answers` as `in progress`', () => {
    cy.navigateToUrl(allSectionsUrl);

    cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
  });
});
