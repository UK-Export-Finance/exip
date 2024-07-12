import { contactUsPage } from '../../../../../pages';
import footer from '../../../../../partials/footer';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const { generalEnquiries, applicationEnquiries } = contactUsPage;

const CONTENT_STRINGS = PAGES.CONTACT_US_PAGE;

const {
  GENERAL_ENQUIRIES,
  APPLICATION_ENQUIRES,
  CONTACT_DETAILS: { EMAIL },
  QUOTE_REFERENCE_NUMBER,
} = CONTENT_STRINGS;

const baseUrl = Cypress.config('baseUrl');

context('Contact us page - Quote', () => {
  const url = ROUTES.CONTACT_US;

  beforeEach(() => {
    cy.login();

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
    });
  });

  it('renders an intro/description', () => {
    cy.checkText(contactUsPage.whoToContactText(), CONTENT_STRINGS.WHO_TO_CONTACT);
  });

  describe('`application enquiries` section', () => {
    it('renders a heading', () => {
      cy.checkText(generalEnquiries.heading(), GENERAL_ENQUIRIES.HEADING);
    });

    it('renders `email prefix` copy', () => {
      cy.checkText(generalEnquiries.emailPrefix(), EMAIL.PREFIX);
    });

    it('renders an email link', () => {
      cy.checkLink(generalEnquiries.emailLink(), EMAIL.VALUE, EMAIL.TEXT);
    });

    it('renders a `quote reference number` link', () => {
      cy.checkText(generalEnquiries.quoteReferenceNumber(), QUOTE_REFERENCE_NUMBER);
    });
  });

  describe('`application enquiries` section', () => {
    it('renders a heading', () => {
      cy.checkText(applicationEnquiries.heading(), APPLICATION_ENQUIRES.HEADING);
    });

    it('renders `email prefix` copy', () => {
      cy.checkText(applicationEnquiries.emailPrefix(), EMAIL.PREFIX);
    });

    it('renders an email link', () => {
      cy.checkLink(applicationEnquiries.emailLink(), EMAIL.VALUE, EMAIL.TEXT);
    });

    it('renders a `quote reference number` link', () => {
      cy.checkText(applicationEnquiries.quoteReferenceNumber(), QUOTE_REFERENCE_NUMBER);
    });
  });
});
