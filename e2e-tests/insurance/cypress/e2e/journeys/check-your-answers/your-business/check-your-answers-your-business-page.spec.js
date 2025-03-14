import { headingCaption, status } from '../../../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS, YOUR_BUYER },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Check your answers - Your business - I want to confirm my selection for the your business section of my credit insurance application',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({});

        cy.clickTaskCheckAnswers();

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

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
        currentHref: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`,
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
        cy.checkTaskStatusCompleted(status);
      });

      describe('form submission', () => {
        it(`should redirect to ${YOUR_BUYER}`, () => {
          cy.navigateToUrl(url);

          cy.clickSubmitButton();

          const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER}`;
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
  },
);
