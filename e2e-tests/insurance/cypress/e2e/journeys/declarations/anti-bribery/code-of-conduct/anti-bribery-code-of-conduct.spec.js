import {
  headingCaption,
  yesRadio,
  noRadio,
} from '../../../../../../../pages/shared';
import { codeOfConductPage } from '../../../../../../../pages/insurance/declarations';
import partials from '../../../../../../../partials';
import {
  PAGES,
  LINKS,
  ERROR_MESSAGES,
} from '../../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY_CODE_OF_CONDUCT;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: {
      ROOT: ANTI_BRIBERY_ROOT,
      CODE_OF_CONDUCT,
    },
  },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.HAS_ANTI_BRIBERY_CODE_OF_CONDUCT;

const baseUrl = Cypress.config('baseUrl');

context("Insurance - Declarations - Anti-bribery - Code of conduct page - As an Exporter, I want to confirm if I will use my company's anti - bribery code of conduct for my export insurance application, So that UKEF can refer to it as applicable when processing my export insurance application", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarationsAndSubmit.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();
      cy.completeAndSubmitDeclarationAntiBribery();

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
      cy.checkText(codeOfConductPage.hint.intro(), FIELDS[FIELD_ID].HINT.INTRO);

      cy.checkLink(codeOfConductPage.hint.link(), LINKS.EXTERNAL.BRIBERY_ACT_2010_GUIDANCE, FIELDS[FIELD_ID].HINT.LINK.TEXT);
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

    it('should NOT render conditional `we will email you` hint without selecting the "yes" radio', () => {
      // yesRadio(FIELD_ID).hint().should('not.be.visible');
      codeOfConductPage.revealText().should('not.be.visible');
    });

    it('should display conditional `we will email you` hint when selecting the "yes" radio', () => {
      yesRadio().input().click();

      codeOfConductPage.revealText().should('be.visible');

      cy.checkText(codeOfConductPage.revealText(), FIELDS[FIELD_ID].ANSWER_YES_REVEAL.TEXT);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a validation error', () => {
        const expectedErrorsCount = 1;

        cy.submitAndAssertRadioErrors(
          yesRadio(FIELD_ID),
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY,
        );
      });
    });
  });
});
