import { headingCaption } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    CREDIT_CONTROL,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Business - Check your answers - As an exporter, I want to check my answers to the your business section', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitCreditControlForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`,
      backLink: `${ROOT}/${referenceNumber}${CREDIT_CONTROL}`,
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    describe('continue', () => {
      it(`should redirect to ${ALL_SECTIONS}`, () => {
        cy.navigateToUrl(url);

        cy.clickSubmitButton();

        cy.assertUrl(allSectionsUrl);
      });
    });
  });
});
