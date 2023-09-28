import {
  yesNoRadioHint, yesRadio, noRadio, noRadioInput, submitButton,
} from '../../../../../../pages/shared';
import preCreditPeriodPage from '../../../../../../pages/insurance/eligibility/preCreditPeriod';
import {
  FIELDS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
} from '../../../../../../commands/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD;

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD;

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

    cy.assertUrl(url);
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

    it('renders `yes` radio button with hint', () => {
      yesRadio().input().should('exist');

      cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

      cy.checkText(yesNoRadioHint(), FIELDS.INSURANCE.ELIGIBILITY[FIELD_ID].HINT);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      cy.checkText(noRadio().label(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    describe('expandable details - what is the pre-credit period', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      const { description } = preCreditPeriodPage;

      it('should render summary text with collapsed conditional `details` content', () => {
        cy.checkText(description.summary(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.INTRO);

        description.details().should('not.have.attr', 'open');
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `details` content', () => {
          description.summary().click();

          description.details().should('have.attr', 'open');
          description.list.intro().should('be.visible');

          cy.checkText(description.list.intro(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.LIST_INTRO);
          cy.checkText(description.list.item1(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.LIST[0].TEXT);
          cy.checkText(description.list.item2(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.LIST[1].TEXT);

          cy.checkText(description.body1(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.BODY_1);
          cy.checkText(description.body2(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.BODY_2);
          cy.checkText(description.body3(), CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.BODY_3);
        });
      });
    });
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render validation errors', () => {
      const expectedErrorsCount = 1;

      cy.submitAndAssertRadioErrors(
        yesRadio(FIELD_ID),
        0,
        expectedErrorsCount,
        ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY,
      );
    });
  });

  describe('when submitting the answer as `no`', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      noRadio().input().click();
      submitButton().click();
    });

    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`, () => {
      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`;

      cy.assertUrl(expected);
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        cy.clickBackLink();

        noRadioInput().should('be.checked');
      });
    });
  });
});
