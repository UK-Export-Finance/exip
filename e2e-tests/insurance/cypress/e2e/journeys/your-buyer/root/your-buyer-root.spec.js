import partials from '../../../../../../partials';
import {
  listIntro,
  listItem,
  listOutro,
  outro,
  startNowLink,
  allSectionsLink,
} from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.ROOT;

const {
  ROOT,
  ALL_SECTIONS,
  YOUR_BUYER: {
    ROOT: YOUR_BUYER_ROOT,
    COMPANY_OR_ORGANISATION,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - start page - As an exporter, I want to provide the details on the buyer of my export trade, So that UKEF can gain clarity on the buyer history as part of due diligence', () => {
  let referenceNumber;
  let yourBuyerRootUrl;
  let companyOrOrganisationUrl;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      yourBuyerRootUrl = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER_ROOT}`;
      companyOrOrganisationUrl = `${ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;
      allSectionsUrl = `${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(yourBuyerRootUrl);
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
      currentHref: `${ROOT}/${referenceNumber}${YOUR_BUYER_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      assertSubmitButton: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(yourBuyerRootUrl);
    });

    it('renders a list intro', () => {
      cy.checkText(listIntro(), CONTENT_STRINGS.LIST.INTRO);
    });

    it('renders list items', () => {
      cy.checkText(listItem(1), CONTENT_STRINGS.LIST.ITEMS[0]);
      cy.checkText(listItem(2), CONTENT_STRINGS.LIST.ITEMS[1]);
      cy.checkText(listItem(3), CONTENT_STRINGS.LIST.ITEMS[2]);
    });

    it('renders a list outro', () => {
      cy.checkText(listOutro(), CONTENT_STRINGS.LIST.OUTRO);
    });

    it('renders an outro', () => {
      cy.checkText(outro(), CONTENT_STRINGS.OUTRO);
    });

    it('renders a `start now` link', () => {
      cy.checkLink(
        startNowLink(),
        companyOrOrganisationUrl,
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
    it(`should redirect to ${COMPANY_OR_ORGANISATION}`, () => {
      cy.navigateToUrl(yourBuyerRootUrl);

      startNowLink().click();

      cy.assertUrl(`${baseUrl}${companyOrOrganisationUrl}`);
    });
  });

  describe('when clicking the `all sections` link', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(yourBuyerRootUrl);

      allSectionsLink().click();

      cy.assertUrl(`${baseUrl}${allSectionsUrl}`);
    });
  });
});
