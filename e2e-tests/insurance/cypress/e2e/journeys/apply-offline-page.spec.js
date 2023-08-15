import { buyerCountryPage, submitButton } from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../commands/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;
const { ACTIONS } = CONTENT_STRINGS;

const {
  START,
  APPLY_OFFLINE,
  ELIGIBILITY: { BUYER_COUNTRY },
} = INSURANCE_ROUTES;

const COUNTRY_NAME_APPLY_OFFLINE_ONLY = 'Angola';

const baseUrl = Cypress.config('baseUrl');

context('Insurance - apply offline exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    completeStartForm();
    completeCheckIfEligibleForm();

    cy.keyboardInput(buyerCountryPage.input(), COUNTRY_NAME_APPLY_OFFLINE_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();

    const expectedUrl = `${baseUrl}${APPLY_OFFLINE}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: APPLY_OFFLINE,
      backLink: BUYER_COUNTRY,
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
