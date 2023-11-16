import { checkYourAnswersEligibility } from '../../../../../../pages/insurance/check-your-answers';
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
    START_NEW_APPLICATION,
    TYPE_OF_POLICY,
  },
} = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.CHECK_YOUR_ANSWERS.ELIGIBILITY;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Eligibility page - I want to confirm my selection for the eligibility section of my credit insurance application ', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;
  let startNewApplicationUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ELIGIBILITY}`;

      allSectionsUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      startNewApplicationUrl = `${INSURANCE_ROOT}/${referenceNumber}${START_NEW_APPLICATION}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${ELIGIBILITY}`,
      backLink: allSectionsUrl,
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

    it(`renders a change answers banner with a valid href to ${START_NEW_APPLICATION}`, () => {
      cy.checkText(checkYourAnswersEligibility.banner(), `${CONTENT_STRINGS.CHANGE_ELIGIBILITY} ${CONTENT_STRINGS.CHANGE_ELIGIBILITY_LINK.text}`);

      cy.checkLink(checkYourAnswersEligibility.bannerLink(), startNewApplicationUrl, CONTENT_STRINGS.CHANGE_ELIGIBILITY_LINK.text);
    });

    it('renders a `save and back` button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.CHANGE_ANSWERS_START_NEW_APPLICATION);
    });

    describe('form submission', () => {
      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        submitButton().click();

        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the all sections page', () => {
        beforeEach(() => {
          cy.navigateToUrl(allSectionsUrl);
        });

        it('should update the status of task `check your answers` to `in progress`', () => {
          cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
        });
      });

      describe('start new application button link', () => {
        it(`should redirect to ${START_NEW_APPLICATION}`, () => {
          cy.navigateToUrl(url);

          saveAndBackButton().click();

          const expected = `${Cypress.config('baseUrl')}${startNewApplicationUrl}`;

          cy.assertUrl(expected);
        });
      });
    });
  });
});
