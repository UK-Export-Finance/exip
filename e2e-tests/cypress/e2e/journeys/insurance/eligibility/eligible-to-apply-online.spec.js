import {
  heading, submitButton,
} from '../../../pages/shared';
import { insurance } from '../../../pages';
import partials from '../../../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import getReferenceNumber from '../../../helpers/get-reference-number';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE;

const {
  START,
  ROOT: INSURANCE_ROOT,
  ELIGIBILITY: {
    ELIGIBLE_TO_APPLY_ONLINE,
    COMPANIES_HOUSE_NUMBER,
  },
  ALL_SECTIONS,
} = ROUTES.INSURANCE;

context('Insurance - Eligibility - You are eligible to apply online page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAnswersHappyPath();

    const expected = `${Cypress.config('baseUrl')}${ELIGIBLE_TO_APPLY_ONLINE}`;

    cy.url().should('eq', expected);
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

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    cy.checkText(partials.backLink(), LINKS.BACK);

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${COMPANIES_HOUSE_NUMBER}`;

    cy.url().should('include', expectedUrl);

    // go back to page
    cy.navigateToUrl(ELIGIBLE_TO_APPLY_ONLINE);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', START);
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders inset text', () => {
    insurance.eligibility.eligibleToApplyOnlinePage.insetText().should('exist');

    cy.checkText(insurance.eligibility.eligibleToApplyOnlinePage.insetText(), CONTENT_STRINGS.INSET);
  });

  it('renders body text', () => {
    insurance.eligibility.eligibleToApplyOnlinePage.body().should('exist');

    cy.checkText(insurance.eligibility.eligibleToApplyOnlinePage.body(), CONTENT_STRINGS.BODY);
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    cy.checkText(submitButton(), CONTENT_STRINGS.SUBMIT_BUTTON);
  });

  describe('form submission', () => {
    it(`should redirect to ${INSURANCE_ROOT}/[referenceNumber]${ALL_SECTIONS}`, () => {
      submitButton().click();

      getReferenceNumber().then((id) => {
        const referenceNumber = id;
        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

        cy.url().should('eq', expectedUrl);
      });
    });
  });
});
