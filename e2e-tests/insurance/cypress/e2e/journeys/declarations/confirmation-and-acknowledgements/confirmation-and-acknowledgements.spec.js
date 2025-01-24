import { headingCaption, singleInputField, declarationPage } from '../../../../../../pages/shared';
import { BUTTONS, PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS.VERSIONS[0];

const {
  APPLICATION_SUBMITTED,
  DECLARATIONS: { CONFIRMATION_AND_ACKNOWLEDGEMENTS, MODERN_SLAVERY },
  ROOT: INSURANCE_ROOT,
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS;

const baseUrl = Cypress.config('baseUrl');

const field = singleInputField(FIELD_ID);

context(
  "Insurance - Declarations - Confirmation and acknowledgements page - As an Exporter, I want the system to provide the details of my application's confirmation and acknowledgement, So that, I can readily confirm my credit insurance application",
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({});

        cy.completeAndSubmitDeclarationsForms({ stopSubmittingAfter: 'modernSlavery', referenceNumber });

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

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
        currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`,
        backLink: `${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`,
        submitButtonCopy: BUTTONS.SUBMIT_APPLICATION,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      describe('latest confirmation-and-acknowledgements content', () => {
        const listContent = CONTENT_STRINGS.LIST;

        const { intro, level1, level2 } = declarationPage.listItems;

        it('renders an intro paragraph', () => {
          cy.checkText(intro(), CONTENT_STRINGS.INTRO);
        });

        it('renders level 1 list items', () => {
          const level1Content = listContent;

          cy.checkText(level1.item(1), level1Content[0].text);
          cy.checkText(level1.item(2), level1Content[1].text);
        });

        it('renders level 2 list items', () => {
          const level2Content = listContent[1].children;

          cy.checkText(level2.item(1), level2Content[0].text);
          cy.checkText(level2.item(2), level2Content[1].text);
          cy.checkText(level2.item(3), level2Content[2].text);
        });
      });

      it("renders `I've read and agree` legend and input", () => {
        cy.checkText(field.legend(), CONTENT_STRINGS.LABEL);

        field.input().should('exist');
      });

      it('renders a submit button and `save and back` button', () => {
        cy.assertSubmitAndSaveButtons(BUTTONS.SUBMIT_APPLICATION);
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

          it('should retain the status of task `declarations and submit` as `in progress`', () => {
            cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
          });
        });
      });

      describe('when submitting a fully completed form', () => {
        it(`should redirect to ${APPLICATION_SUBMITTED}`, () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements();

          const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

          cy.assertUrl(expectedUrl);
        });
      });
    });
  },
);
