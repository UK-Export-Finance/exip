import {
  submitButton,
  saveAndBackButton,
} from '../../../pages/shared';
import {
  BUTTONS,
} from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../constants/routes/insurance';
import getReferenceNumber from '../../../helpers/get-reference-number';
import { YOUR_BUYER_FIELD_IDS } from '../../../../../content-strings/fields/insurance/your-buyer';
import { yourBuyer as yourBuyerPage } from '../../../pages/insurance/your-buyer';

const {
  BUYER_COUNTRY,
  BUYER_COUNTRY_LABEL,
  BUYER_ORGANISATION,
  BUYER_ORGANISATION_LABEL,
  BUYER_ADDRESS,
  BUYER_ADDRESS_LABEL,
} = YOUR_BUYER_FIELD_IDS;

const goToPageDirectly = (referenceNumber) => {
  cy.visit(`${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.YOUR_BUYER_DETAILS}`, {
    auth: {
      username: Cypress.config('basicAuthKey'),
      password: Cypress.config('basicAuthSecret'),
    },
  });
};

context('Insurance - Your Buyer - Type of your buyer Page - As an exporter, I want to enter the buyer details', () => {
  let referenceNumber;

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

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.YOUR_BUYER_DETAILS}`;
      goToPageDirectly(referenceNumber);
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  describe('countries', () => {
    it('renders `countries` label and input', () => {
      const field = yourBuyerPage[BUYER_COUNTRY];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(BUYER_COUNTRY_LABEL);
      });

      field.input().should('exist');
    });
  });

  it('renders `buyer organisation or company` label, and input', () => {
    const field = yourBuyerPage[BUYER_ORGANISATION];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(BUYER_ORGANISATION_LABEL);
    });
    field.input().should('exist');
  });

  it('renders `buyer address` label, and input', () => {
    const field = yourBuyerPage[BUYER_ADDRESS];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(BUYER_ADDRESS_LABEL);
    });
    field.input().should('exist');
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  it('renders a `save and back` button', () => {
    saveAndBackButton().should('exist');

    saveAndBackButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.SAVE_AND_BACK);
    });
  });
});
