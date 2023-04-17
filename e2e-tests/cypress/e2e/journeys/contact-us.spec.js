import { contactUsPage } from '../pages';
import footer from '../partials/footer';
import { PAGES } from '../../../content-strings';
import { ROUTES } from '../../../constants';

const CONTENT_STRINGS = PAGES.CONTACT_US_PAGE;

context('Contact us page', () => {
  const url = ROUTES.CONTACT_US;

  beforeEach(() => {
    cy.login();

    // click on contact link in footer
    footer.supportLinks.contact().click();

    cy.url().should('include', url);

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

  it('renders a general enquiries section', () => {
    const { generalEnquiries } = contactUsPage;
    const { GENERAL_ENQUIRIES } = CONTENT_STRINGS;

    cy.checkText(generalEnquiries.heading(), GENERAL_ENQUIRIES.HEADING);
    cy.checkText(generalEnquiries.telephone(), `${GENERAL_ENQUIRIES.TELEPHONE.PREFIX} ${GENERAL_ENQUIRIES.TELEPHONE.VALUE}`);
    cy.checkText(generalEnquiries.email(), `${GENERAL_ENQUIRIES.EMAIL.PREFIX} ${GENERAL_ENQUIRIES.EMAIL.VALUE}`);
    cy.checkText(generalEnquiries.openingHours(), GENERAL_ENQUIRIES.OPENING_TIMES);
    cy.checkLink(generalEnquiries.callChargesLink(), GENERAL_ENQUIRIES.CALL_CHARGES.HREF, GENERAL_ENQUIRIES.CALL_CHARGES.TEXT);
  });

  it('renders an application enquiries section', () => {
    const { applicationEnquires } = contactUsPage;
    const { APPLICATION_ENQUIRES } = CONTENT_STRINGS;

    cy.checkText(applicationEnquires.heading(), APPLICATION_ENQUIRES.HEADING);
    cy.checkText(applicationEnquires.email(), `${APPLICATION_ENQUIRES.EMAIL.PREFIX} ${APPLICATION_ENQUIRES.EMAIL.VALUE}`);
    cy.checkText(applicationEnquires.quoteReferenceNumber(), APPLICATION_ENQUIRES.QUOTE);
  });
});
