import partials from '../../../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import assertSectionStartContent from '../../../../../../commands/shared-commands/assertions/assert-section-start-content';

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

context('Insurance - Your buyer - Start page - As an exporter, I want to provide the details on the buyer of my export trade, So that UKEF can gain clarity on the buyer history as part of due diligence', () => {
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

    it('renders an intro', () => {
      assertSectionStartContent.intro(CONTENT_STRINGS.INTRO);
    });

    it('renders a list intro', () => {
      assertSectionStartContent.list.intro(CONTENT_STRINGS.LIST.INTRO);
    });

    it('renders list items', () => {
      assertSectionStartContent.list.items(CONTENT_STRINGS.LIST.ITEMS);
    });

    it('renders a list outro', () => {
      assertSectionStartContent.list.outro(CONTENT_STRINGS.LIST.OUTRO);
    });

    it('renders an outro', () => {
      assertSectionStartContent.outro(CONTENT_STRINGS.OUTRO);
    });

    it('renders a `start now` link', () => {
      assertSectionStartContent.startNow.link({
        expectedUrl: companyOrOrganisationUrl,
      });
    });

    it('renders an `all sections` link', () => {
      assertSectionStartContent.allSections.link({
        expectedUrl: allSectionsUrl,
      });
    });
  });

  describe('when clicking the `start now` link', () => {
    it(`should redirect to ${COMPANY_OR_ORGANISATION}`, () => {
      assertSectionStartContent.startNow.linkRedirection({
        currentUrl: yourBuyerRootUrl,
        expectedUrl: `${baseUrl}${companyOrOrganisationUrl}`,
      });
    });
  });

  describe('when clicking the `all sections` link', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      assertSectionStartContent.allSections.linkRedirection({
        currentUrl: yourBuyerRootUrl,
        expectedUrl: `${baseUrl}${allSectionsUrl}`,
      });
    });
  });
});
