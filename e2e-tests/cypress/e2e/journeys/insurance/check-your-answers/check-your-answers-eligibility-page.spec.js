import { eligibilityCheckYourAnswers } from '../../../pages/insurance/check-your-answers';
import {
  headingCaption,
  submitButton,
  saveAndBackButton,
} from '../../../pages/shared';
import partials from '../../../partials';
import {
  BUTTONS,
  PAGES,
} from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../constants/routes/insurance';

const {
  ROOT,
  START,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: {
    ELIGIBILITY,
    TYPE_OF_POLICY,
  },
} = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.CHECK_YOUR_ANSWERS.ELIGIBILITY;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswersAndSubmit;

context('Insurance - Check your answers - Eligibility - I want to confirm my selection for the eligibility section of my export insurance application ', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPrepareYourApplicationSectionSinglePolicyType();

      task.link().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ELIGIBILITY}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${ELIGIBILITY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      submitButtonCopy: BUTTONS.CONFIRM_AND_CONTINUE,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to insurance start', () => {
      partials.header.serviceName().should('have.attr', 'href', START);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`renders a change answers banner with a valid href to ${START}`, () => {
      cy.checkText(eligibilityCheckYourAnswers.banner(), `${CONTENT_STRINGS.CHANGE_ELIGIBILITY} ${CONTENT_STRINGS.CHANGE_ELIGIBILITY_LINK}`);
      cy.checkLink(eligibilityCheckYourAnswers.bannerLink(), START, CONTENT_STRINGS.CHANGE_ELIGIBILITY_LINK);
    });

    it('renders a `save and back` button', () => {
      submitButton().should('exist');
      cy.checkText(submitButton(), BUTTONS.CONFIRM_AND_CONTINUE);

      saveAndBackButton().should('exist');
      cy.checkText(saveAndBackButton(), BUTTONS.CHANGE_ANSWERS_NEW_APPLICATION);
    });

    describe('form submission', () => {
      describe('continue', () => {
        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          submitButton().click();

          const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;
          cy.url().should('eq', expectedUrl);
        });
      });

      describe('save and back', () => {
        it(`should redirect to ${START}`, () => {
          cy.navigateToUrl(url);

          saveAndBackButton().click();

          const expectedUrl = `${Cypress.config('baseUrl')}${START}`;
          cy.url().should('eq', expectedUrl);
        });
      });
    });
  });
});
