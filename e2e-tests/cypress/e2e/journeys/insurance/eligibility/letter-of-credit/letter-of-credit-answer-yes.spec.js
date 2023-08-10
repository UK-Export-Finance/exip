import {
  backLink, cannotApplyPage, yesRadio, yesRadioInput, submitButton,
} from '../../../../pages/shared';
import { LINKS, PAGES } from '../../../../../../content-strings';
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
} from '../../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;

context('Insurance - Eligibility - Letter of credit page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction that is paid via letter of credit - submit `paid by letter of credit`', () => {
  const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`;

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
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    yesRadio().click();
    submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.APPLY_OFFLINE);
  });

  it('renders a back link with correct url', () => {
    const expectedHref = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`;

    cy.checkLink(
      backLink(),
      expectedHref,
      LINKS.BACK,
    );
  });

  it('renders a specific reason', () => {
    const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.WILL_BE_PAID_BY_LETTER_OF_CREDIT}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });

  it('should NOT have the originally submitted answer selected when going back to the page', () => {
    cy.clickBackLink();

    yesRadioInput().should('not.be.checked');
  });
});
