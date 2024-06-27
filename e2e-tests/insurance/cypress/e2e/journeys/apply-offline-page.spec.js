import { insurance } from '../../../../pages';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;
const { ACTIONS } = CONTENT_STRINGS;

const { APPLY_OFFLINE } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');
const applyOfflineUrl = `${baseUrl}${APPLY_OFFLINE}`;

context('Insurance - apply offline exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(applyOfflineUrl);
    cy.assertUrl(applyOfflineUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: APPLY_OFFLINE,
      backLink: `${applyOfflineUrl}#`,
      hasAForm: false,
      assertAuthenticatedHeader: false,
    });
  });

  it('renders `download form` copy with link', () => {
    const expected = `${ACTIONS.DOWNLOAD_FORM.LINK.TEXT} ${ACTIONS.DOWNLOAD_FORM.TEXT}`;
    cy.checkText(insurance.applyOfflinePage.downloadFormCopy(), expected);

    cy.checkLink(insurance.applyOfflinePage.downloadFormLink(), ACTIONS.DOWNLOAD_FORM.LINK.HREF_NBI, ACTIONS.DOWNLOAD_FORM.LINK.TEXT);
  });

  it('renders `contact` copy with link', () => {
    const expectedContactCopy = `${ACTIONS.CONTACT.TEXT} ${ACTIONS.CONTACT.LINK.TEXT}`;

    cy.checkText(insurance.applyOfflinePage.contactCopy(), expectedContactCopy);

    const expectedLinkHref = ACTIONS.CONTACT.LINK.HREF;
    const expectedLinkText = ACTIONS.CONTACT.LINK.TEXT;

    cy.checkLink(insurance.applyOfflinePage.contactLink(), expectedLinkHref, expectedLinkText);
  });
});
