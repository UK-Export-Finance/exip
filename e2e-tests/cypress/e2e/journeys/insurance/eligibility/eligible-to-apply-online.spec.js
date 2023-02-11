import { submitButton } from '../../../pages/shared';
import { insurance } from '../../../pages';
import partials from '../../../partials';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

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

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ELIGIBLE_TO_APPLY_ONLINE,
      expectedBackLink: COMPANIES_HOUSE_NUMBER,
      assertSubmitButton: true,
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', START);
  });

  it('renders inset text', () => {
    insurance.eligibility.eligibleToApplyOnlinePage.insetText().should('exist');

    cy.checkText(insurance.eligibility.eligibleToApplyOnlinePage.insetText(), CONTENT_STRINGS.INSET);
  });

  it('renders body text', () => {
    insurance.eligibility.eligibleToApplyOnlinePage.body().should('exist');

    cy.checkText(insurance.eligibility.eligibleToApplyOnlinePage.body(), CONTENT_STRINGS.BODY);
  });

  describe('form submission', () => {
    it(`should redirect to ${INSURANCE_ROOT}/[referenceNumber]${ALL_SECTIONS}`, () => {
      submitButton().click();

      cy.getReferenceNumber().then((id) => {
        const referenceNumber = id;
        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

        cy.url().should('eq', expectedUrl);
      });
    });
  });
});
