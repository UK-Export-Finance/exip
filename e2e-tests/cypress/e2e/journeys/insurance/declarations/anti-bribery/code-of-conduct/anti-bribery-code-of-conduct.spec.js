import {
  headingCaption,
  submitButton,
  saveAndBackButton,
  yesRadio,
  yesRadioInput,
  noRadio,
  inlineErrorMessage,
} from '../../../../../pages/shared';
import { codeOfConductPage } from '../../../../../pages/insurance/declarations';
import partials from '../../../../../partials';
import {
  BUTTONS,
  PAGES,
  LINKS,
  ERROR_MESSAGES,
} from '../../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY_CODE_OF_CONDUCT;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: {
      ROOT: ANTI_BRIBERY_ROOT,
      CODE_OF_CONDUCT,
      EXPORTING_WITH_CODE_OF_CONDUCT,
    },
  },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.HAS_ANTI_BRIBERY_CODE_OF_CONDUCT;

context("Insurance - Declarations - Anti-bribery - Code of conduct page - As an Exporter, I want to confirm if I will use my company's anti - bribery code of conduct for my export insurance application, So that UKEF can refer to it as applicable when processing my export insurance application", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarations.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();
      cy.completeAndSubmitDeclarationAntiBribery();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
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
      yesRadio().should('exist');

      cy.checkText(yesRadio(), 'Yes');
    });

    it('renders `no` radio button', () => {
      noRadio().should('exist');

      cy.checkText(noRadio(), 'No');
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a validation error', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY;

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting a fully completed form', () => {
      it(`should redirect to ${EXPORTING_WITH_CODE_OF_CONDUCT}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();

        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

        cy.url().should('eq', expectedUrl);
      });
    });
  });
});
