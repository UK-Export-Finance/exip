import { companyDetails } from '../../../../pages/your-business';
import { continueButton } from '../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import partials from '../../../../partials';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_NAME,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

describe('Your business - company house search - As an Exporter I want to enter details about my business in \'your business\' section', () => {
  before(() => {
    cy.visit(ROUTES.INSURANCE.YOUR_BUSINESS.COMPANY_DETAILS, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.url().should('include', ROUTES.INSURANCE.YOUR_BUSINESS.COMPANY_DETAILS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('trading name', () => {
    it('should display validation errors if trading name question is not answered', () => {
      continueButton().click();
      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
        });
    });

    it('should focus to the trading name section when clicking the error', () => {
      partials.errorSummaryListItemLinks().eq(0).click();
      companyDetails.tradingNameYesRadio().should('have.focus');
    });

    it('should display the validation error for trading name in radio error summary', () => {
      companyDetails.tradingNameError().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY}`);
        });
    });
  });
});
