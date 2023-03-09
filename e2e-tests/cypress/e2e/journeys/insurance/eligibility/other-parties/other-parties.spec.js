import {
  yesRadio, yesRadioInput, noRadio, noRadioInput, inlineErrorMessage, submitButton,
} from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import partials from '../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../support/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
} from '../../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED;

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - Other parties page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction if there are other parties involved in the export', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD,
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders `yes` radio button', () => {
    yesRadio().should('exist');

    cy.checkText(yesRadio(), 'Yes');
  });

  it('renders `no` radio button', () => {
    noRadio().should('exist');

    cy.checkText(noRadio(), 'No');
  });

  describe('expandable details', () => {
    it('renders summary text', () => {
      insurance.eligibility.otherPartiesPage.description.summary().should('exist');

      cy.checkText(insurance.eligibility.otherPartiesPage.description.summary(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.INTRO);
    });

    it('clicking summary text reveals details', () => {
      insurance.eligibility.otherPartiesPage.description.summary().click();

      insurance.eligibility.otherPartiesPage.description.list.intro().should('be.visible');
    });

    it('renders expanded content', () => {
      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.intro(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST_INTRO);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item1(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[0].TEXT);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item2(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[1].TEXT);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item3(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[2].TEXT);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item4(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[3].TEXT);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item5(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[4].TEXT);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_IDS.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED].IS_EMPTY;

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
        noRadio().click();
        submitButton().click();
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`, () => {
        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`;

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
});
