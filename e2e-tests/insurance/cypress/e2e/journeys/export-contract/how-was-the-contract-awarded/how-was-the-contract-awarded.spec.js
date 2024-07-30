import { headingCaption } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WAS_THE_CONTRACT_AWARDED;

const {
  ROOT,
  EXPORT_CONTRACT: { ROOT: EXPORT_CONTRACT_ROOT, ABOUT_GOODS_OR_SERVICES, HOW_WAS_THE_CONTRACT_AWARDED },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - How was the contract awarded page - As a Legal adviser, I want to understand how the contract was awarded, So that I can assure UKEF adheres to due diligence procedures',
  () => {
    let referenceNumber;
    let url;
    let aboutGoodsOrServicesUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.startInsuranceExportContractSection({});

        url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WAS_THE_CONTRACT_AWARDED}`;
        aboutGoodsOrServicesUrl = `${baseUrl}${ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

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
        currentHref: `${ROOT}/${referenceNumber}${HOW_WAS_THE_CONTRACT_AWARDED}`,
        backLink: `${ROOT}/${referenceNumber}${EXPORT_CONTRACT_ROOT}`,
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
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES}`, () => {
        cy.completeAndSubmitHowWasTheContractAwardedForm();

        cy.assertUrl(aboutGoodsOrServicesUrl);
      });
    });
  },
);
