import { contactUsPage } from '../../../../pages';
import footer from '../../../../partials/footer';
import { PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const { generalEnquiries, applicationEnquiries } = contactUsPage;

const CONTENT_STRINGS = PAGES.CONTACT_US_PAGE;

const { GENERAL_ENQUIRIES, APPLICATION_ENQUIRES, CONTACT_DETAILS, QUOTE_REFERENCE_NUMBER } = CONTENT_STRINGS;

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
      isInsurancePage: true,
    });
  });

  it('renders an intro/description', () => {
    cy.checkText(contactUsPage.whoToContactText(), CONTENT_STRINGS.WHO_TO_CONTACT);
  });

  it('renders a `general enquiries` section', () => {
    cy.checkText(generalEnquiries.heading(), GENERAL_ENQUIRIES.HEADING);

    cy.checkText(generalEnquiries.email(), `${CONTACT_DETAILS.EMAIL.PREFIX}: ${CONTACT_DETAILS.EMAIL.VALUE}`);

    cy.checkText(generalEnquiries.quoteReferenceNumber(), QUOTE_REFERENCE_NUMBER);
  });

  it('renders an `application enquiries` section', () => {
    cy.checkText(applicationEnquiries.heading(), APPLICATION_ENQUIRES.HEADING);

    cy.checkText(applicationEnquiries.email(), `${CONTACT_DETAILS.EMAIL.PREFIX}: ${CONTACT_DETAILS.EMAIL.VALUE}`);

    cy.checkText(applicationEnquiries.quoteReferenceNumber(), QUOTE_REFERENCE_NUMBER);
  });
});
