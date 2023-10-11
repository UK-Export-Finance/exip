import {
  yesRadio, noRadio, noRadioInput, submitButton,
} from '../../../../../../pages/shared';
import otherPartiesPage from '../../../../../../pages/insurance/eligibility/otherParties';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
} from '../../../../../../commands/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED;

const {
  ELIGIBILITY: { OTHER_PARTIES_INVOLVED: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Other parties page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction if there are other parties involved in the export', () => {
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();

    url = `${baseUrl}${ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `yes` radio button', () => {
      yesRadio().input().should('exist');

      cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      noRadio().input().should('exist');

      cy.checkText(noRadio().label(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    describe('expandable details - what counts as another party', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      const { description } = otherPartiesPage;

      it('should render summary text with collapsed conditional `details` content', () => {
        cy.checkText(description.summary(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.INTRO);

        description.details().should('not.have.attr', 'open');
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `details` content', () => {
          description.summary().click();

          description.details().should('have.attr', 'open');

          cy.checkText(description.list.intro(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST_INTRO);

          cy.checkText(description.list.item1(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[0].TEXT);

          cy.checkText(description.list.item2(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[1].TEXT);

          cy.checkText(description.list.item3(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[2].TEXT);

          cy.checkText(description.list.item4(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[3].TEXT);

          cy.checkText(description.list.item5(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[4].TEXT);
        });
      });
    });
  });

  describe('form submission', () => {
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

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`, () => {
        const expected = `${baseUrl}${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`;

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
});
