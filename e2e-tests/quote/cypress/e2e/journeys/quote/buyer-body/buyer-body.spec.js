import { yesRadio, noRadio } from '../../../../../../pages/shared';
import buyerBodyPage from '../../../../../../pages/quote/buyerBody';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const CONTENT_STRINGS = PAGES.QUOTE.BUYER_BODY;

const {
  ELIGIBILITY: { VALID_BUYER_BODY: FIELD_ID },
} = FIELD_IDS;

const {
  QUOTE: {
    BUYER_BODY,
    BUYER_COUNTRY,
    EXPORTER_LOCATION,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

const url = `${baseUrl}${BUYER_BODY}`;

context('Buyer body page - as an exporter, I want to check if I can get an EXIP online quote for my buyers country', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm({});

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: BUYER_BODY,
      backLink: BUYER_COUNTRY,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  it('renders `yes` radio button', () => {
    cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

    cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders `no` radio button', () => {
    cy.checkText(noRadio().label(), FIELD_VALUES.NO);

    cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
  });

  describe('expandable details - what counts as government or public sector body', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    const { description } = buyerBodyPage;

    it('should render summary text with collapsed conditional `details` content', () => {
      cy.checkText(description.summary(), CONTENT_STRINGS.DETAILS.INTRO);

      description.details().should('not.have.attr', 'open');
    });

    describe('when clicking the summary text', () => {
      it('should expand the collapsed `details` content', () => {
        description.summary().click();

        description.details().should('have.attr', 'open');

        cy.checkText(description.body1(), CONTENT_STRINGS.DETAILS.BODY_1);
        cy.checkText(description.body2(), CONTENT_STRINGS.DETAILS.BODY_2);
      });
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        cy.submitAndAssertRadioErrors({
          field: yesRadio(FIELD_ID),
          expectedErrorMessage: ERROR_MESSAGES.ELIGIBILITY[FIELD_ID],
        });
      });
    });

    describe('when submitting the answer as `no`', () => {
      it(`should redirect to ${EXPORTER_LOCATION}`, () => {
        cy.clickNoRadioInput();
        cy.clickSubmitButton();

        const expectedUrl = `${baseUrl}${EXPORTER_LOCATION}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
