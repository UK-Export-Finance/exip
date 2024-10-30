import { contactUsPage } from '../../../../../pages';
import { intro } from '../../../../../pages/shared';
import { footer } from '../../../../../partials';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const { generalEnquiries, applicationEnquiries } = contactUsPage;

const CONTENT_STRINGS = PAGES.CONTACT_US_PAGE;

const { GENERAL_ENQUIRIES, APPLICATION_ENQUIRES, QUOTE_REFERENCE_NUMBER } = CONTENT_STRINGS;

const baseUrl = Cypress.config('baseUrl');

context('Contact us page - Quote', () => {
  const url = ROUTES.CONTACT_US;

  beforeEach(() => {
    cy.navigateToRootUrl();

    // click on contact link in footer
    footer.supportLinks.contact().click();

    cy.assertUrl(`${baseUrl}${url}`);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.clearCookies();

    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.CONTACT_US,
      backLink: ROUTES.QUOTE.BUYER_COUNTRY,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      assertSaveAndBackButtonDoesNotExist: true,
    });
  });

  it('renders an intro/description', () => {
    cy.checkText(intro(), CONTENT_STRINGS.INTRO);
  });

  it('renders a `quote reference number` link', () => {
    cy.checkText(contactUsPage.quoteReferenceNumber(), QUOTE_REFERENCE_NUMBER);
  });

  describe('`application enquiries` section', () => {
    it('renders a heading', () => {
      cy.checkText(generalEnquiries.heading(), GENERAL_ENQUIRIES.HEADING);
    });

    it('renders a `contact details` section', () => {
      cy.assertContactDetailsContent();
    });
  });

  describe('`application enquiries` section', () => {
    const {
      HEADING,
      CONTACT_DETAILS: { UNDERWRITING_EMAIL },
    } = APPLICATION_ENQUIRES;

    it('renders a heading', () => {
      cy.checkText(applicationEnquiries.heading(), HEADING);
    });

    it('renders `email prefix` copy', () => {
      cy.checkText(applicationEnquiries.emailPrefix(), `${UNDERWRITING_EMAIL.PREFIX}:`);
    });

    it('renders an email link', () => {
      cy.checkLink(applicationEnquiries.emailLink(), UNDERWRITING_EMAIL.VALUE, UNDERWRITING_EMAIL.TEXT);
    });
  });
});
