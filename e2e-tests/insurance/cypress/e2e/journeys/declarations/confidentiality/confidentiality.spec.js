import { headingCaption, singleInputField, declarationPage } from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY.VERSIONS[0];

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  DECLARATIONS: {
    CONFIDENTIALITY,
    ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT },
  },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

const baseUrl = Cypress.config('baseUrl');

const field = singleInputField(FIELD_ID);

context(
  'Insurance - Declarations - Confidentiality page - As an Exporter, I want to make confidentiality declaration for my credit insurance application, So that UKEF can be assured of my agreement with regards to confidentiality while processing my credit insurance application',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({});
        cy.completeAndSubmitCheckYourAnswers();

        // go to the page we want to test.
        cy.clickTaskDeclarationsAndSubmit();

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`;

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
        currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
        backLink: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
        lightHouseThresholds: {
          accessibility: 98,
        },
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      describe('latest confidentiality content', () => {
        const listContent = CONTENT_STRINGS.LIST;

        const { intro, level1, level2, level3 } = declarationPage.listItems;

        it('renders an intro paragraph', () => {
          cy.checkText(intro(), CONTENT_STRINGS.INTRO);
        });

        it('renders level 1 list items', () => {
          const level1Content = listContent;

          cy.checkText(level1.item(1), level1Content[0].text);
          cy.checkText(level1.item(2), level1Content[1].text);
          cy.checkText(level1.item(3), level1Content[2].text);
        });

        it('renders level 2 list items', () => {
          const level2Content = listContent[0].children;

          cy.checkText(level2.item(1), level2Content[0].text);
          cy.checkText(level2.item(2), level2Content[1].text);
          cy.checkText(level2.item(3), level2Content[2].text);
          cy.checkText(level2.item(4), level2Content[3].text);
        });

        it('renders level 3 list items', () => {
          const level3Content = listContent[0].children[3].children;

          cy.checkText(level3.item(1), level3Content[0].text);
          cy.checkText(level3.item(2), level3Content[1].text);
        });
      });

      it('renders a `confirm` legend and input', () => {
        cy.checkText(field.legend(), CONTENT_STRINGS.LABEL);

        field.input().should('exist');
      });

      it('renders a submit button and `save and back` button', () => {
        cy.assertSubmitAndSaveButtons();
      });
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render a validation error', () => {
          cy.submitAndAssertRadioErrors({
            field,
            expectedErrorMessage: ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY,
          });
        });

        describe('when going back to the all sections page', () => {
          beforeEach(() => {
            cy.navigateToAllSectionsUrl(referenceNumber);
          });

          it('should retain the status of task `check your answers` as `completed`', () => {
            cy.checkTaskCheckAnswersStatusIsComplete();
          });

          it('should retain the status of task `declarations and submit` as `not started yet`', () => {
            cy.checkTaskDeclarationsAndSubmitStatusIsNotStartedYet();
          });
        });
      });

      describe('when submitting a fully completed form', () => {
        it(`should redirect to ${ANTI_BRIBERY_ROOT}`, () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitDeclarationConfidentiality();

          const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`;

          cy.assertUrl(expectedUrl);
        });

        describe('when going back to the all sections page', () => {
          beforeEach(() => {
            cy.navigateToAllSectionsUrl(referenceNumber);
          });

          it('should retain the status of task `check your answers` as `completed`', () => {
            cy.checkTaskCheckAnswersStatusIsComplete();
          });

          it('should updated the status of task `declarations and submit` to`in progress`', () => {
            cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
          });
        });

        describe('when going back to the page', () => {
          it('should have the submitted value', () => {
            cy.navigateToUrl(url);

            cy.completeAndSubmitDeclarationConfidentiality();

            cy.navigateToUrl(url);

            cy.assertRadioOptionIsChecked(field.input());
          });
        });
      });
    });
  },
);
