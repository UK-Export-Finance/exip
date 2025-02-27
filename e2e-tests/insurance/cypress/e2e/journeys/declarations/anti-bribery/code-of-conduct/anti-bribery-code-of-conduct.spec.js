import { field, headingCaption, yesRadio, noRadio } from '../../../../../../../pages/shared';
import { codeOfConductPage } from '../../../../../../../pages/insurance/declarations';
import { PAGES, LINKS, ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY_CODE_OF_CONDUCT.VERSIONS[1];

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT, CODE_OF_CONDUCT },
  },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.HAS_ANTI_BRIBERY_CODE_OF_CONDUCT;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Declarations - Anti-bribery - Code of conduct page - As an Exporter, I want to confirm if I will use my company's anti - bribery code of conduct for my credit insurance application, So that UKEF can refer to it as applicable when processing my credit insurance application",
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({});

        cy.completeAndSubmitDeclarationsForms({ stopSubmittingAfter: 'antiBribery', referenceNumber });

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT}`;

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
        currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT}`,
        backLink: `${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('renders a hint', () => {
        cy.checkText(field(FIELD_ID).hintIntro(), CONTENT_STRINGS.HINT.INTRO);

        cy.checkLink(field(FIELD_ID).hintLink(), LINKS.EXTERNAL.BRIBERY_ACT_2010_GUIDANCE, CONTENT_STRINGS.HINT.LINK.TEXT);
      });

      it('renders `yes` radio button', () => {
        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);

        yesRadio().input().should('exist');
      });

      it('renders `no` radio button', () => {
        noRadio().input().should('exist');

        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });

      it('renders a submit button and `save and back` button', () => {
        cy.assertSubmitAndSaveButtons();
      });

      it('should NOT render a conditional `we will email you` hint without selecting the "yes" radio', () => {
        codeOfConductPage.revealText().should('not.be.visible');
      });

      it('should render a conditional `we will email you` hint when selecting the "yes" radio', () => {
        cy.clickYesRadioInput();

        codeOfConductPage.revealText().should('be.visible');

        cy.checkText(codeOfConductPage.revealText(), CONTENT_STRINGS.ANSWER_YES_REVEAL.TEXT);
      });
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render a validation error', () => {
          cy.submitAndAssertRadioErrors({
            field: yesRadio(FIELD_ID),
            expectedErrorMessage: ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY,
          });
        });
      });
    });
  },
);
