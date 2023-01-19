import { natureOfBusiness } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/exporter-business';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const turnoverUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER}`;

describe('Insurance - Your business - Nature of your business page - As an Exporter I want to enter details about the nature of my business - goods or services input validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.visit(url, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(`${GOODS_OR_SERVICES} error`, () => {
    describe(`when ${GOODS_OR_SERVICES} is left empty`, () => {
      it(`should display validation errors if ${GOODS_OR_SERVICES} left empty`, () => {
        natureOfBusiness.goodsOrServices().clear();
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 1);
        partials.errorSummaryListItems().first().invoke('text')
          .then((text) => {
            expect(text.trim()).equal(NATURE_OF_BUSINESS_ERRORS[GOODS_OR_SERVICES].IS_EMPTY);
          });
      });

      it(`should focus to the ${GOODS_OR_SERVICES} section when clicking the error`, () => {
        partials.errorSummaryListItemLinks().first().click();
        natureOfBusiness.goodsOrServices().should('have.focus');
      });

      it(`should display the validation error for ${GOODS_OR_SERVICES}`, () => {
        natureOfBusiness.goodsOrServicesError().invoke('text')
          .then((text) => {
            expect(text.trim()).equal(`Error: ${NATURE_OF_BUSINESS_ERRORS[GOODS_OR_SERVICES].IS_EMPTY}`);
          });
      });
    });

    describe(`when ${GOODS_OR_SERVICES} has over 1000 characters`, () => {
      it(`should display validation errors if ${GOODS_OR_SERVICES} left empty`, () => {
        natureOfBusiness.goodsOrServices().clear().type('a'.repeat(FIELDS.NATURE_OF_YOUR_BUSINESS[GOODS_OR_SERVICES].MAXIMUM + 1));
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 1);
        partials.errorSummaryListItems().first().invoke('text')
          .then((text) => {
            expect(text.trim()).equal(NATURE_OF_BUSINESS_ERRORS[GOODS_OR_SERVICES].TOO_MANY_CHARACTERS);
          });
      });

      it(`should display the validation error for ${GOODS_OR_SERVICES}`, () => {
        natureOfBusiness.goodsOrServicesError().invoke('text')
          .then((text) => {
            expect(text.trim()).equal(`Error: ${NATURE_OF_BUSINESS_ERRORS[GOODS_OR_SERVICES].TOO_MANY_CHARACTERS}`);
          });
      });
    });
  });

  describe(`when ${GOODS_OR_SERVICES} is correctly entered`, () => {
    it('should not display validation errors', () => {
      cy.visit(url, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      natureOfBusiness.goodsOrServices().clear().type('test');
      submitButton().click();
      cy.url().should('eq', turnoverUrl);
    });
  });
});
