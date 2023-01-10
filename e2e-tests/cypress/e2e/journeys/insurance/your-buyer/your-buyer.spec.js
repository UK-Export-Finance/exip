import {
  submitButton,
  saveAndBackButton,
} from '../../../pages/shared';
import partials from '../../../partials';
import {
  BUTTONS,
  LINKS,
} from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../constants/routes/insurance';
import getReferenceNumber from '../../../helpers/get-reference-number';
import { FIELDS } from '../../../../../content-strings/fields/insurance/your-buyer'
import { yourBuyerPage } from '../../../pages/insurance/your-buyer';

const { START } = ROUTES.INSURANCE;
const insuranceStartRoute = START;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY,
    },
  },
} = ROUTES;


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

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.YOUR_BUYER_DETAILS}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

    cy.url().should('eq', expectedUrl);

    goToPageDirectly(referenceNumber);
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
      const fieldId = FIELDS.YOUR_BUYER.BUYER_COUNTRY.ID;
      const field = yourBuyerPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal( FIELDS.YOUR_BUYER.BUYER_COUNTRY.LABEL);
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