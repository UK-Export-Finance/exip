import { headingCaption } from '../../../../../../pages/shared';
import {
  BUTTONS,
  PAGES,
} from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  YOUR_BUYER: {
    BUYER_FINANCIAL_INFORMATION,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CHECK_YOUR_ANSWERS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Check your answers - As an exporter, I want to check my answers to the your buyer section', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({});
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      allSectionsUrl = `${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
      backLink: `${ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`,
      submitButtonCopy: BUTTONS.SAVE_AND_BACK,
      assertSaveAndBackButtonDoesNotExist: true,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${allSectionsUrl}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
