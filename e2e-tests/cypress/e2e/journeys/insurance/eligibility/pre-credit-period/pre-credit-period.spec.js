import {
  yesNoRadioHint, yesRadio, yesRadioInput, noRadio, noRadioInput, inlineErrorMessage, submitButton,
} from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import partials from '../../../../partials';
import {
  FIELDS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../support/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
} from '../../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD;

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD;
const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - Eligibility - Pre-credit period page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction that is paid via letter of credit', () => {
  const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD}`;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();
    completeOtherPartiesForm();
    completeLetterOfCreditForm();

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to insurance start', () => {
      partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
    });

    it('renders `yes` radio button with hint', () => {
      cy.checkText(yesRadio(), FIELD_VALUES.YES);

      cy.checkText(yesNoRadioHint(), FIELDS.INSURANCE.ELIGIBILITY[FIELD_ID].HINT);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      cy.checkText(noRadio(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    describe('expandable details', () => {
      it('renders summary text', () => {
        insurance.eligibility.preCreditPeriodPage.description.summary().should('exist');

        cy.checkText(insurance.eligibility.preCreditPeriodPage.description.summary(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.INTRO);
      });

      it('clicking summary text reveals details', () => {
        insurance.eligibility.preCreditPeriodPage.description.summary().click();

        insurance.eligibility.preCreditPeriodPage.description.list.intro().should('be.visible');
      });

      it('renders body text', () => {
        insurance.eligibility.preCreditPeriodPage.description.body1().should('exist');

        cy.checkText(insurance.eligibility.preCreditPeriodPage.description.body1(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.BODY_1);
      });

      it('renders expanded content', () => {
        cy.checkText(insurance.eligibility.preCreditPeriodPage.description.list.intro(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.LIST_INTRO);

        cy.checkText(insurance.eligibility.preCreditPeriodPage.description.list.item1(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.LIST[0].TEXT);

        cy.checkText(insurance.eligibility.preCreditPeriodPage.description.list.item2(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.LIST[1].TEXT);
      });

      it('renders outro body text', () => {
        insurance.eligibility.preCreditPeriodPage.description.body2().should('exist');

        cy.checkText(insurance.eligibility.preCreditPeriodPage.description.body2(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.BODY_2);

        insurance.eligibility.preCreditPeriodPage.description.body3().should('exist');

        cy.checkText(insurance.eligibility.preCreditPeriodPage.description.body3(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.BODY_3);
      });
    });
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render validation errors', () => {
      submitButton().click();

      partials.errorSummaryListItems().should('exist');
      partials.errorSummaryListItems().should('have.length', 1);

      const expectedMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY;

      cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

      cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
    });

    it('should focus on input when clicking summary error message', () => {
      submitButton().click();

      partials.errorSummaryListItemLinks().eq(0).click();
      yesRadioInput().should('have.focus');
    });
  });

  describe('when submitting the answer as `no`', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      noRadio().click();
      submitButton().click();
    });

    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`, () => {
      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`;

      cy.url().should('eq', expected);
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        cy.clickBackLink();

        noRadioInput().should('be.checked');
      });
    });
  });
});
