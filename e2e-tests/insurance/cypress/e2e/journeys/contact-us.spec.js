import { contactUsPage } from '../../../../pages';
import { intro } from '../../../../pages/shared';
import footer from '../../../../partials/footer';
import { PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const { generalEnquiries, applicationEnquiries } = contactUsPage;

const CONTENT_STRINGS = PAGES.CONTACT_US_PAGE;

const { GENERAL_ENQUIRIES, APPLICATION_ENQUIRES, QUOTE_REFERENCE_NUMBER } = CONTENT_STRINGS;

const baseUrl = Cypress.config('baseUrl');

context('Contact us page - Insurance', () => {
  const url = ROUTES.INSURANCE.CONTACT_US;

  beforeEach(() => {
    cy.navigateToCheckIfEligibleUrl();

    footer.supportLinks.contact().click();

    cy.assertUrl(`${baseUrl}${url}`);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.clearCookies();

    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.CONTACT_US,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      assertSaveAndBackButtonDoesNotExist: true,
      isInsurancePage: true,
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
