import {
  headingCaption,
  yesRadio,
  yesRadioInput,
  noRadio,
} from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: {
      CODE_OF_CONDUCT,
      EXPORTING_WITH_CODE_OF_CONDUCT,
    },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.WILL_EXPORT_WITH_CODE_OF_CONDUCT;

const baseUrl = Cypress.config('baseUrl');

context("Insurance - Declarations - Anti-bribery - Exporting with code of conduct page - As an Exporter, I want to confirm if I will use my company's anti - bribery code of conduct for my export insurance application, So that UKEF can refer to it as applicable when processing my export insurance application", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarationsAndSubmit.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();
      cy.completeAndSubmitDeclarationAntiBribery();
      cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders `yes` radio button', () => {
      cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);

      yesRadio().input().should('exist');
    });

    it('renders `no` radio button', () => {
      cy.checkText(noRadio().label(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);

      noRadio().input().should('exist');
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
        const expectedErrorsCount = 1;

        cy.submitAndAssertRadioErrors(
          yesRadio(FIELD_ID),
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY,
        );
      });
    });

    describe('when submitting a fully completed form', () => {
      it(`should redirect to ${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();

        const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          yesRadioInput().should('be.checked');
        });
      });
    });
  });
});
