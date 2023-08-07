import { buyerCountryPage, submitButton } from '../../pages/shared';
import { insurance } from '../../pages';
import { PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;
const { ACTIONS } = CONTENT_STRINGS;

const COUNTRY_NAME_APPLY_OFFLINE_ONLY = 'Angola';

context('Insurance - apply offline exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();

    cy.keyboardInput(buyerCountryPage.input(), COUNTRY_NAME_APPLY_OFFLINE_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();

    cy.assertUrl(ROUTES.INSURANCE.APPLY_OFFLINE);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.APPLY_OFFLINE,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
    });
  });

  it('renders `download form` copy with link', () => {
    const expected = `${ACTIONS.DOWNLOAD_FORM.LINK.TEXT} ${ACTIONS.DOWNLOAD_FORM.TEXT}`;
    cy.checkText(insurance.applyOfflinePage.downloadFormCopy(), expected);

    cy.checkText(insurance.applyOfflinePage.downloadFormLink(), ACTIONS.DOWNLOAD_FORM.LINK.TEXT);

    insurance.applyOfflinePage.downloadFormLink().should('have.attr', 'href', ACTIONS.DOWNLOAD_FORM.LINK.HREF_NBI);
  });

  it('renders `contact` copy with link', () => {
    const expected = `${ACTIONS.CONTACT.TEXT} ${ACTIONS.CONTACT.LINK.TEXT}`;
    cy.checkText(insurance.applyOfflinePage.contactCopy(), expected);

    insurance.applyOfflinePage.contactLink().should('have.attr', 'href', ACTIONS.CONTACT.LINK.HREF);
  });
});
