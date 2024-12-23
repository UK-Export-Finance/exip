import { field, headingCaption } from '../../../../../../pages/shared';
import { modernSlaveryPage } from '../../../../../../pages/insurance/declarations';
import { expandable } from '../../../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/declarations';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    MODERN_SLAVERY,
  },
} = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: {
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const {
  intro: { answerTheQuestions, guidingPrinciplesLink, ifYouSayNo },
} = modernSlaveryPage;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Declarations - Modern slavery page - As a UKEF legal adviser, I want to know whether an exporter adheres to the Modern Slavery Act 2015, So that UKEF is not at risk of supporting ethically unsustainable businesses',
  () => {
    let referenceNumber;
    let url;
    let confirmationAndAcknowledgementsUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitDeclarationsForms({ formToStopAt: 'exportingWithCodeOfConduct', referenceNumber });

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`;
        confirmationAndAcknowledgementsUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

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
        currentHref: `${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`,
        backLink: `${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      describe('intro', () => {
        it('should render `answer the questions` copy', () => {
          cy.checkText(answerTheQuestions(), CONTENT_STRINGS.INTRO.ANSWER_THE_QUESTIONS);
        });

        it('should render a `guiding principles` link', () => {
          cy.checkLink(guidingPrinciplesLink(), '#', CONTENT_STRINGS.INTRO.GUIDING_PRINCIPLES_LINK.TEXT);
        });

        it('should render `if you say no` copy', () => {
          cy.checkText(ifYouSayNo(), CONTENT_STRINGS.INTRO.IF_YOU_SAY_NO);
        });
      });

      describe('expandable details - definition of terms', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render summary text with collapsed conditional `details` content', () => {
          const expectedText = CONTENT_STRINGS.EXPANDABLE.VERSIONS[0].INTRO;

          cy.checkText(expandable.summary(), expectedText);

          expandable.details().should('not.have.attr', 'open');
        });

        describe('when clicking the summary text', () => {
          it('should expand the collapsed `details` content', () => {
            expandable.summary().click();

            expandable.details().should('have.attr', 'open');
          });
        });
      });
    });

    describe('form submission', () => {
      describe('when submitting all radios as `yes`', () => {
        it(`should redirect to ${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`, () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitModernSlaveryForm({
            willAdhereToAllRequirements: true,
            hasNoOffensesOrInvestigations: true,
            isNotAwareOfExistingSlavery: true,
          });

          cy.assertUrl(confirmationAndAcknowledgementsUrl);
        });

        it('should update the status of task `declarations and submit` to `in progress`', () => {
          cy.navigateToAllSectionsUrl(referenceNumber);

          cy.assertAllSectionsUrl(referenceNumber);

          cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
        });

        it('should have the submitted values when going back to the page', () => {
          cy.navigateToUrl(url);

          cy.assertYesRadioOptionIsChecked(0);
          cy.assertYesRadioOptionIsChecked(1);
          cy.assertYesRadioOptionIsChecked(2);
        });
      });

      describe('when submitting all radios as `no` and submitting conditional fields', () => {
        it(`should redirect to ${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`, () => {
          cy.navigateToUrl(url);

          cy.completeModernSlaveryForm({
            willAdhereToAllRequirements: false,
            hasNoOffensesOrInvestigations: false,
            isNotAwareOfExistingSlavery: false,
          });

          cy.completeAndSubmitModernSlaveryFormConditionalFields({});

          cy.assertUrl(confirmationAndAcknowledgementsUrl);
        });

        it('should update the status of task `declarations and submit` to `in progress`', () => {
          cy.navigateToAllSectionsUrl(referenceNumber);

          cy.assertAllSectionsUrl(referenceNumber);

          cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
        });

        describe('when going back to the page', () => {
          beforeEach(() => {
            cy.navigateToUrl(url);
          });

          it('should render the submitted radio values', () => {
            cy.assertNoRadioOptionIsChecked(0);
            cy.assertNoRadioOptionIsChecked(1);
            cy.assertNoRadioOptionIsChecked(2);
          });

          it(`should render conditional "${CANNOT_ADHERE_TO_ALL_REQUIREMENTS}" field`, () => {
            field(CANNOT_ADHERE_TO_ALL_REQUIREMENTS).textarea().should('be.visible');
          });

          it(`should render conditional "${OFFENSES_OR_INVESTIGATIONS}" field`, () => {
            field(OFFENSES_OR_INVESTIGATIONS).textarea().should('be.visible');
          });

          it(`should render conditional "${AWARE_OF_EXISTING_SLAVERY}" field`, () => {
            field(AWARE_OF_EXISTING_SLAVERY).textarea().should('be.visible');
          });

          it(`should have the submitted "${CANNOT_ADHERE_TO_ALL_REQUIREMENTS}" textarea value`, () => {
            const fieldId = CANNOT_ADHERE_TO_ALL_REQUIREMENTS;

            cy.checkTextareaValue({
              fieldId,
              expectedValue: application.DECLARATION.MODERN_SLAVERY[fieldId],
            });
          });

          it(`should have the submitted "${OFFENSES_OR_INVESTIGATIONS}" textarea value`, () => {
            const fieldId = OFFENSES_OR_INVESTIGATIONS;

            cy.checkTextareaValue({
              fieldId,
              expectedValue: application.DECLARATION.MODERN_SLAVERY[fieldId],
            });
          });

          it(`should have the submitted "${AWARE_OF_EXISTING_SLAVERY}" textarea value`, () => {
            const fieldId = AWARE_OF_EXISTING_SLAVERY;

            cy.checkTextareaValue({
              fieldId,
              expectedValue: application.DECLARATION.MODERN_SLAVERY[fieldId],
            });
          });
        });
      });
    });
  },
);
