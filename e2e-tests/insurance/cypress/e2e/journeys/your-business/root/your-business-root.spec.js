import partials from '../../../../../../partials';
import {
  intro,
  listIntro,
  listItem,
  outro,
  startNowLink,
  allSectionsLink,
} from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.ROOT;

const {
  ROOT,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    ROOT: EXPORTER_BUSINESS_ROOT,
    COMPANY_DETAILS,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Alternative trading address page - I want to input information on an alternative business trading address So that I can provide necessary business information to support my application for Export Insurance', () => {
  let referenceNumber;
  let yourBusinessRootUrl;
  let companyDetailsUrl;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      yourBusinessRootUrl = `${baseUrl}${ROOT}/${referenceNumber}${EXPORTER_BUSINESS_ROOT}`;
      companyDetailsUrl = `${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;
      allSectionsUrl = `${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(yourBusinessRootUrl);
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
      currentHref: `${ROOT}/${referenceNumber}${EXPORTER_BUSINESS_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      assertSubmitButton: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(yourBusinessRootUrl);
    });

    it('renders an intro', () => {
      cy.checkText(intro(), CONTENT_STRINGS.INTRO);
    });

    it('renders a list intro', () => {
      cy.checkText(listIntro(), CONTENT_STRINGS.LIST.INTRO);
    });

    it('renders list items', () => {
      cy.checkText(listItem(1), CONTENT_STRINGS.LIST.ITEMS[0]);
      cy.checkText(listItem(2), CONTENT_STRINGS.LIST.ITEMS[1]);
      cy.checkText(listItem(3), CONTENT_STRINGS.LIST.ITEMS[2]);
    });

    it('renders an outro', () => {
      cy.checkText(outro(), CONTENT_STRINGS.OUTRO);
    });

    it('renders a `start now` link', () => {
      cy.checkLink(
        startNowLink(),
        companyDetailsUrl,
        BUTTONS.START_NOW,
      );
    });

    it('renders an `all sections` link', () => {
      cy.checkLink(
        allSectionsLink(),
        allSectionsUrl,
        BUTTONS.START_DIFFERENT_SECTION,
      );
    });
  });

  describe('when clicking the `start now` link', () => {
    it(`should redirect to ${COMPANY_DETAILS}`, () => {
      cy.navigateToUrl(yourBusinessRootUrl);

      startNowLink().click();

      cy.assertUrl(`${baseUrl}${companyDetailsUrl}`);
    });
  });

  describe('when clicking the `all sections` link', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(yourBusinessRootUrl);

      allSectionsLink().click();

      cy.assertUrl(`${baseUrl}${allSectionsUrl}`);
    });
  });
});
