import partials from '../../../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import assertSectionStartContent from '../../../../../../commands/shared-commands/assertions/assert-section-start-content';

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

context('Insurance - Your business - Start page - As an Exporter, I want to provide details about my business, So that I can provide necessary business information to support my application for Export Insurance', () => {
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
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(yourBusinessRootUrl);
    });

    it('renders an intro', () => {
      assertSectionStartContent.intro(CONTENT_STRINGS.INTRO);
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
        expectedUrl: companyDetailsUrl,
      });
    });

    it('renders an `all sections` link', () => {
      assertSectionStartContent.allSections.link({
        expectedUrl: allSectionsUrl,
      });
    });
  });

  describe('when clicking the `start now` link', () => {
    it(`should redirect to ${COMPANY_DETAILS}`, () => {
      assertSectionStartContent.startNow.linkRedirection({
        currentUrl: yourBusinessRootUrl,
        expectedUrl: `${baseUrl}${companyDetailsUrl}`,
      });
    });
  });

  describe('when clicking the `all sections` link', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      assertSectionStartContent.allSections.linkRedirection({
        currentUrl: yourBusinessRootUrl,
        expectedUrl: `${baseUrl}${allSectionsUrl}`,
      });
    });
  });
});
