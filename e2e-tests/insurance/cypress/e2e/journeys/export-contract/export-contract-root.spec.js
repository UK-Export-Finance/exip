import partials from '../../../../../partials';
import {
  listIntro,
  listItem,
  outro,
  startNowLink,
  allSectionsLink,
} from '../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.ROOT;

const {
  ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: {
    ROOT: EXPORT_CONTRACT_ROOT,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exportContract;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - start page - As an Exporter, I want to provide details on my export contract, So that UKEF can have clarity on the export contract', () => {
  let referenceNumber;
  let exportContractRootUrl;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      exportContractRootUrl = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT_ROOT}`;
      allSectionsUrl = `${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(exportContractRootUrl);
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
      currentHref: `${ROOT}/${referenceNumber}${EXPORT_CONTRACT_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      assertSubmitButton: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(exportContractRootUrl);
    });

    it('renders a list intro', () => {
      cy.checkText(listIntro(), CONTENT_STRINGS.LIST.INTRO);
    });

    it('renders list items', () => {
      cy.checkText(listItem(1), CONTENT_STRINGS.LIST.ITEMS[0]);
      cy.checkText(listItem(2), CONTENT_STRINGS.LIST.ITEMS[1]);
      cy.checkText(listItem(3), CONTENT_STRINGS.LIST.ITEMS[2]);
      cy.checkText(listItem(4), CONTENT_STRINGS.LIST.ITEMS[3]);
    });

    it('renders an outro', () => {
      cy.checkText(outro(), CONTENT_STRINGS.OUTRO);
    });

    it('renders a `start now` link', () => {
      cy.checkLink(
        startNowLink(),
        '#',
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
    it('should redirect to #', () => {
      cy.navigateToUrl(exportContractRootUrl);

      startNowLink().click();

      cy.assertUrl(`${exportContractRootUrl}#`);
    });
  });

  describe('when clicking the `all sections` link', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(exportContractRootUrl);

      allSectionsLink().click();

      cy.assertUrl(`${baseUrl}${allSectionsUrl}`);
    });
  });
});
