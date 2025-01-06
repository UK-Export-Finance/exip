import { headingCaption, singleInputField, declarationPage } from '../../../../../../pages/shared';
import { expandable } from '../../../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY.VERSIONS[1];

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    CONFIDENTIALITY,
    ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT, CODE_OF_CONDUCT },
  },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Declarations - Anti-bribery page - As an Exporter, I want the system to provide the details of the anti-bribery and corruption declaration for my credit insurance application, So that, while processing my credit insurance application. I have clarity on my anti-bribery and corruption declarations',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

        /**
         * TODO: EMS-4096
         * Introduce/enforce this, for all other declaration routes.
         */
        cy.completeAndSubmitCheckYourAnswers();

        cy.completeAndSubmitDeclarationsForms({ formToStopAt: 'confidentiality', referenceNumber });

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`;

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
        currentHref: `${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`,
        backLink: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
      });
    });

    describe('page tests', () => {
      let field;

      beforeEach(() => {
        cy.navigateToUrl(url);

        field = singleInputField(FIELD_ID);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      describe('latest anti-bribery content', () => {
        const listContent = CONTENT_STRINGS.LIST;

        const { intro, level1, level2 } = declarationPage.listItems;

        it('renders an intro paragraph', () => {
          cy.checkText(intro(), CONTENT_STRINGS.INTRO);
        });

        it('renders level 1 list items', () => {
          const level1Content = listContent;

          cy.checkText(level1.item(1), level1Content[0].text);
          cy.checkText(level1.item(2), level1Content[1].text);
          cy.checkText(level1.item(3), level1Content[2].text);
          cy.checkText(level1.item(4), level1Content[3].text);
          cy.checkText(level1.item(5), level1Content[4].text);
          cy.checkText(level1.item(6), level1Content[5].text);
          cy.checkText(level1.item(7), level1Content[6].text);
          cy.checkText(level1.item(8), level1Content[7].text);
          cy.checkText(level1.item(9), level1Content[8].text);
        });

        it('renders level 2 list items', () => {
          const level2Content0 = listContent[2].children;

          cy.checkText(level2.itemLevel(1, 0), level2Content0[0].text);
          cy.checkText(level2.itemLevel(2, 0), level2Content0[1].text);
          cy.checkText(level2.itemLevel(3, 0), level2Content0[2].text);

          const level2Content1 = listContent[6].children;

          cy.checkText(level2.itemLevel(1, 1), level2Content1[0].text);
          cy.checkText(level2.itemLevel(2, 1), level2Content1[1].text);
          cy.checkText(level2.itemLevel(3, 1), level2Content1[2].text);
        });
      });

      describe('expandable details - definition of terms', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render summary text with collapsed conditional `details` content', () => {
          cy.checkText(expandable.summary(), CONTENT_STRINGS.EXPANDABLE.INTRO);

          expandable.details().should('not.have.attr', 'open');
        });

        describe('when clicking the summary text', () => {
          it('should expand the collapsed `details` content', () => {
            expandable.summary().click();

            expandable.details().should('have.attr', 'open');
          });
        });
      });

      it("renders `I've read and agree` legend and input", () => {
        cy.checkText(field.legend(), CONTENT_STRINGS.LABEL);

        field.input().should('exist');
      });

      it('renders a submit button and `save and back` button', () => {
        cy.assertSubmitAndSaveButtons();
      });
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        let field;

        beforeEach(() => {
          cy.navigateToUrl(url);

          field = singleInputField(FIELD_ID);
        });

        it('should render a validation error', () => {
          const expectedErrorsCount = 1;

          cy.submitAndAssertFieldErrors({
            field,
            expectedErrorsCount,
            expectedErrorMessage: ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY,
            clearInput: false,
          });
        });
      });

      describe('when submitting a fully completed form', () => {
        it(`should redirect to ${CODE_OF_CONDUCT}`, () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitDeclarationAntiBribery();

          const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT}`;

          cy.assertUrl(expectedUrl);
        });

        describe('when going back to the all sections page', () => {
          beforeEach(() => {
            cy.navigateToAllSectionsUrl(referenceNumber);
          });

          it('should retain the status of task `check your answers` as `completed`', () => {
            cy.checkTaskCheckAnswersStatusIsComplete();
          });

          it('should retain the status of task `declarations and submit` as `in progress`', () => {
            cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
          });
        });

        describe('when going back to the page', () => {
          it('should have the submitted value', () => {
            cy.navigateToUrl(url);

            cy.completeAndSubmitDeclarationAntiBribery();

            cy.navigateToUrl(url);

            cy.assertRadioOptionIsChecked(singleInputField(FIELD_ID).input());
          });
        });
      });
    });
  },
);
