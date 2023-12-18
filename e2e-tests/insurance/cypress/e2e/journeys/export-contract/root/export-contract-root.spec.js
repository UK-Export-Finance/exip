import partials from '../../../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import assertSectionStartContent from '../../../../../../commands/shared-commands/assertions/assert-section-start-content';

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

context('Insurance - Export contract - Start page - As an Exporter, I want to provide details on my export contract, So that UKEF can have clarity on the export contract', () => {
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
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(exportContractRootUrl);
    });

    it('renders a list intro', () => {
      assertSectionStartContent.list.intro(CONTENT_STRINGS.LIST.INTRO);
    });

    it('renders list items', () => {
      assertSectionStartContent.list.items(CONTENT_STRINGS.LIST.ITEMS);
    });

    it('renders an outro', () => {
      assertSectionStartContent.outro(CONTENT_STRINGS.OUTRO);
    });

    it('renders a `start now` link', () => {
      assertSectionStartContent.startNow.link({
        expectedUrl: `${ROOT}/${referenceNumber}#`,
      });
    });

    it('renders an `all sections` link', () => {
      assertSectionStartContent.allSections.link({
        expectedUrl: allSectionsUrl,
      });
    });
  });

  describe('when clicking the `start now` link', () => {
    it(`should redirect to ${EXPORT_CONTRACT_ROOT}`, () => {
      assertSectionStartContent.startNow.linkRedirection({
        currentUrl: exportContractRootUrl,
        expectedUrl: `${baseUrl}${ROOT}/${referenceNumber}#`,
      });
    });
  });

  describe('when clicking the `all sections` link', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      assertSectionStartContent.allSections.linkRedirection({
        currentUrl: exportContractRootUrl,
        expectedUrl: `${baseUrl}${allSectionsUrl}`,
      });
    });
  });
});
