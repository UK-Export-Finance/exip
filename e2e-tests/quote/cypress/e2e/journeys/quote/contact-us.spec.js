import { contactUsPage } from '../../../../../pages';
import footer from '../../../../../partials/footer';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.CONTACT_US_PAGE;

const { GENERAL_ENQUIRIES, APPLICATION_ENQUIRES } = CONTENT_STRINGS;

context('Contact us page - Quote', () => {
  const url = ROUTES.CONTACT_US;

  beforeEach(() => {
    cy.login();

    // click on contact link in footer
    footer.supportLinks.contact().click();

    cy.assertUrl(`${Cypress.config('baseUrl')}${url}`);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.clearCookies();

    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.CONTACT_US,
      backLink: ROUTES.QUOTE.BUYER_COUNTRY,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  it('renders an intro/description', () => {
    cy.checkText(contactUsPage.whoToContactText(), CONTENT_STRINGS.WHO_TO_CONTACT);
  });

  it('renders a `general enquiries` section', () => {
    cy.checkText(
      contactUsPage.customerServiceHeading(),
      GENERAL_ENQUIRIES.HEADING,
    );

    cy.assertCustomerServiceContactDetailsContent(GENERAL_ENQUIRIES.HEADING);
  });

  it('renders an `application enquiries` section', () => {
    const { applicationEnquires } = contactUsPage;

    cy.checkText(applicationEnquires.heading(), APPLICATION_ENQUIRES.HEADING);
    cy.checkText(applicationEnquires.email(), `${APPLICATION_ENQUIRES.EMAIL.PREFIX} ${APPLICATION_ENQUIRES.EMAIL.VALUE}`);
    cy.checkText(applicationEnquires.quoteReferenceNumber(), APPLICATION_ENQUIRES.QUOTE);
  });
});
