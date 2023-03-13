import { submitButton } from '../../../pages/shared';
import { insurance } from '../../../pages';
import partials from '../../../partials';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
  completePreCreditPeriodForm,
  completeCompaniesHouseNumberForm,
} from '../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE;

const {
  START,
  ELIGIBILITY: {
    ELIGIBLE_TO_APPLY_ONLINE,
    COMPANIES_HOUSE_NUMBER,
    ACCOUNT_TO_APPLY_ONLINE,
  },
} = ROUTES.INSURANCE;

context('Insurance - Eligibility - You are eligible to apply online page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction', () => {
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
    completeOtherPartiesForm();
    completeLetterOfCreditForm();
    completePreCreditPeriodForm();
    completeCompaniesHouseNumberForm();

    url = `${Cypress.config('baseUrl')}${ELIGIBLE_TO_APPLY_ONLINE}`;

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ELIGIBLE_TO_APPLY_ONLINE,
      backLink: COMPANIES_HOUSE_NUMBER,
      submitButtonCopy: CONTENT_STRINGS.SUBMIT_BUTTON,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to insurance start', () => {
      partials.header.serviceName().should('have.attr', 'href', START);
    });

    it('renders inset text', () => {
      insurance.eligibility.eligibleToApplyOnlinePage.insetText().should('exist');

      cy.checkText(insurance.eligibility.eligibleToApplyOnlinePage.insetText(), CONTENT_STRINGS.INSET);
    });

    it('renders body text', () => {
      insurance.eligibility.eligibleToApplyOnlinePage.body().should('exist');

      cy.checkText(insurance.eligibility.eligibleToApplyOnlinePage.body(), CONTENT_STRINGS.BODY);
    });

    describe('form submission', () => {
      it(`should redirect to ${ACCOUNT_TO_APPLY_ONLINE}`, () => {
        submitButton().click();

        cy.getReferenceNumber().then(() => {
          const expectedUrl = `${Cypress.config('baseUrl')}${ACCOUNT_TO_APPLY_ONLINE}`;

          cy.url().should('eq', expectedUrl);
        });
      });
    });
  });
});
