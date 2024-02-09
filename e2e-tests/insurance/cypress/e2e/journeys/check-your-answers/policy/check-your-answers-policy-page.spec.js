import { headingCaption, status } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
    YOUR_BUSINESS,
  },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.CHECK_YOUR_ANSWERS.POLICY;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy - I want to confirm my selection for the policy section of my credit insurance application', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      allSectionsUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
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
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${YOUR_BUSINESS}`, () => {
      cy.navigateToUrl(url);

      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`;
      cy.assertUrl(expectedUrl);
    });

    describe('when going back to the all sections page', () => {
      beforeEach(() => {
        cy.navigateToUrl(allSectionsUrl);
      });

      it('should retain the status of task `check your answers` as `in progress`', () => {
        cy.checkTaskCheckAnswersStatusIsInProgress();
      });
    });
  });
});
