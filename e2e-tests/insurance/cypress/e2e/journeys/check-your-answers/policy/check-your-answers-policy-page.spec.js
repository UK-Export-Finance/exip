import { headingCaption, status } from '../../../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER, EXPORT_CONTRACT, TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.CHECK_YOUR_ANSWERS.POLICY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy - I want to confirm my selection for the policy section of my credit insurance application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});

      cy.clickTaskCheckAnswers();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 2 });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

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
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER}`,
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
      cy.checkTaskStatusCompleted(status);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${EXPORT_CONTRACT}`, () => {
      cy.navigateToUrl(url);

      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;
      cy.assertUrl(expectedUrl);
    });

    describe('when going back to the all sections page', () => {
      beforeEach(() => {
        cy.navigateToAllSectionsUrl(referenceNumber);
      });

      it('should retain the status of task `check your answers` as `in progress`', () => {
        cy.checkTaskCheckAnswersStatusIsInProgress();
      });

      it('should retain the status of task `declarations and submit` as `cannot start`', () => {
        cy.checkTaskDeclarationsAndSubmitStatusIsCannotStart();
      });
    });
  });
});
