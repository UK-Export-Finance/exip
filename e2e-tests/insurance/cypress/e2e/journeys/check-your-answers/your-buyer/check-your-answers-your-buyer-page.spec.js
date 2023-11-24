import {
  headingCaption,
  status,
  submitButton,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { BUTTONS, PAGES, TASKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUSINESS,
    YOUR_BUYER,
  },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUYER;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Your buyer page - I want to confirm my selection for the your buyer section of my credit insurance application', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Policy" check your answers page
      cy.submitCheckYourAnswersForm();

      // To get past "Your business" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`,
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
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });

    describe('form submission', () => {
      it(`should redirect to ${ALL_SECTIONS}`, () => {
        cy.navigateToUrl(url);

        submitButton().click();

        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;
        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the all sections page', () => {
        beforeEach(() => {
          cy.navigateToUrl(allSectionsUrl);
        });

        it('should change the status of task `check your answers` to `completed`', () => {
          cy.checkTaskStatus(task, TASKS.STATUS.COMPLETED);
        });
      });
    });
  });
});
