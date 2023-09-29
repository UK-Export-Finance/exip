import {
  headingCaption,
  status,
  submitButton,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { BUTTONS, PAGES, TASKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: {
    ELIGIBILITY,
    TYPE_OF_POLICY,
    YOUR_BUSINESS,
  },
} = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.CHECK_YOUR_ANSWERS.POLICY_AND_EXPORTS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Policy and exports - I want to confirm my selection for the policy and exports section of my export insurance application', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      allSectionsUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${ELIGIBILITY}`,
      submitButtonCopy: BUTTONS.CONFIRM_AND_CONTINUE,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status());
    });

    it('renders a `save and back` button', () => {
      submitButton().should('exist');
      cy.checkText(submitButton(), BUTTONS.CONFIRM_AND_CONTINUE);

      saveAndBackButton().should('exist');
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${YOUR_BUSINESS}`, () => {
      cy.navigateToUrl(url);

      submitButton().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`;
      cy.assertUrl(expectedUrl);
    });

    describe('when going back to the all sections page', () => {
      beforeEach(() => {
        cy.navigateToUrl(allSectionsUrl);
      });

      it('should retain the status of task `check your answers` as `in progress`', () => {
        cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
      });
    });
  });
});
