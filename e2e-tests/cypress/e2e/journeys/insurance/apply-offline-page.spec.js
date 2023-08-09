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

    cy.url().should('include', ROUTES.INSURANCE.APPLY_OFFLINE);
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

    cy.checkLink(
      insurance.applyOfflinePage.downloadFormLink(),
      ACTIONS.DOWNLOAD_FORM.LINK.HREF_NBI,
      ACTIONS.DOWNLOAD_FORM.LINK.TEXT,
    );
  });

  it('renders `contact` copy with link', () => {
    const expected = `${ACTIONS.CONTACT.TEXT} ${ACTIONS.CONTACT.LINK.TEXT}`;
    cy.checkText(insurance.applyOfflinePage.contactCopy(), expected);

    const expectedHref = ACTIONS.CONTACT.LINK.HREF;
    const expectedText = ACTIONS.CONTACT.LINK.TEXT;

    cy.checkLink(
      insurance.applyOfflinePage.contactLink(),
      expectedText,
      expectedHref,
    );
  });

  it('renders `contact` copy with link', () => {
    const expectedContactCopy = `${ACTIONS.CONTACT.TEXT} ${ACTIONS.CONTACT.LINK.TEXT}`;

    cy.checkText(insurance.applyOfflinePage.contactCopy(), expectedContactCopy);

    const expectedLinkHref = ACTIONS.CONTACT.LINK.HREF;
    const expectedLinkText = ACTIONS.CONTACT.LINK.TEXT;

    cy.checkLink(
      insurance.applyOfflinePage.contactLink(),
      expectedLinkHref,
      expectedLinkText,
    );
  });
});
