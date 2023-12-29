import {
  yesRadio,
  yesNoRadioHint,
  noRadio,
  submitButton,
} from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELDS } from '../../../../../../content-strings/fields';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { completeAndSubmitBuyerBodyForm } from '../../../../../../commands/quote/forms';

const CONTENT_STRINGS = PAGES.EXPORTER_LOCATION;

const {
  QUOTE: {
    EXPORTER_LOCATION,
    BUYER_BODY,
    UK_GOODS_OR_SERVICES,
  },
} = ROUTES;

const {
  ELIGIBILITY: { VALID_EXPORTER_LOCATION: FIELD_ID },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Exporter location page - as an exporter, I want to check if my company can get UKEF issue credit insurance cover', () => {
  const url = `${baseUrl}${EXPORTER_LOCATION}`;

  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm({});
    completeAndSubmitBuyerBodyForm();

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: EXPORTER_LOCATION,
      backLink: BUYER_BODY,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  it('renders a hint', () => {
    cy.checkText(yesNoRadioHint(), FIELDS[FIELD_ID].HINT);
  });

  it('renders `yes` radio button', () => {
    cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

    cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders `no` radio button', () => {
    cy.checkText(noRadio().label(), FIELD_VALUES.NO);

    cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        const errorIndex = 0;
        const expectedErrorsCount = 1;
        const expectedErrorMessage = ERROR_MESSAGES.ELIGIBILITY[FIELD_ID];

        cy.submitAndAssertRadioErrors(
          yesRadio(FIELD_ID),
          errorIndex,
          expectedErrorsCount,
          expectedErrorMessage,
        );
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${UK_GOODS_OR_SERVICES}`, () => {
        yesRadio().input().click();
        submitButton().click();

        const expectedUrl = `${baseUrl}${UK_GOODS_OR_SERVICES}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
