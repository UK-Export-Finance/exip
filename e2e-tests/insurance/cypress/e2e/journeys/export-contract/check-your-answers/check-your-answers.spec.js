import { headingCaption } from '../../../../../../pages/shared';
import {
  BUTTONS,
  PAGES,
} from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.CHECK_YOUR_ANSWERS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Check your answers - As an exporter, I want to check my answers to the export contract section', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({});

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
      backLink: `${ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`,
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

    describe('form submission', () => {
      it(`should redirect to ${ALL_SECTIONS}`, () => {
        cy.navigateToUrl(url);

        cy.clickSubmitButton();

        cy.assertUrl(allSectionsUrl);
      });
    });
  });
});
