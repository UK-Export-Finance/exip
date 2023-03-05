import {
  backLink, cannotApplyPage, noRadio, noRadioInput, submitButton,
} from '../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
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
  completePreCreditPeriodForm,
} from '../../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;

context('Insurance - Eligibility - Companies house number page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction if I do not have UK Companies House Registration Number - submit `no companies house number`', () => {
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

    noRadio().click();
    submitButton().click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.APPLY_OFFLINE);
  });

  it('renders a back link with correct url', () => {
    backLink().should('exist');

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`;

    backLink().should('have.attr', 'href', expectedUrl);
  });

  it('renders a specific reason', () => {
    const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.NO_COMPANIES_HOUSE_NUMBER}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });

  describe('when going back to the page', () => {
    it('should NOT have the originally submitted answer selected', () => {
      cy.clickBackLink();

      noRadioInput().should('not.be.checked');
    });
  });
});
