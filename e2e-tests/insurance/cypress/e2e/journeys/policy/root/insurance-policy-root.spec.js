import partials from '../../../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import assertSectionStartContent from '../../../../../../commands/shared-commands/assertions/assert-section-start-content';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.ROOT;

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: {
    ROOT: POLICY_ROOT,
    TYPE_OF_POLICY,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Insurance policy - Start page - As an Exporter, I want to provide the details of the export transaction that I need a cover for, So that UKEF can issue a credit insurance cover that meet my export transaction need', () => {
  let referenceNumber;
  let insurancePolicyRootUrl;
  let typeOfPolicyUrl;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      insurancePolicyRootUrl = `${baseUrl}${ROOT}/${referenceNumber}${POLICY_ROOT}`;
      typeOfPolicyUrl = `${ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;
      allSectionsUrl = `${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(insurancePolicyRootUrl);
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
      currentHref: `${ROOT}/${referenceNumber}${POLICY_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(insurancePolicyRootUrl);
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
        expectedUrl: typeOfPolicyUrl,
      });
    });

    it('renders an `all sections` link', () => {
      assertSectionStartContent.allSections.link({
        expectedUrl: allSectionsUrl,
      });
    });
  });

  describe('when clicking the `start now` link', () => {
    it(`should redirect to ${TYPE_OF_POLICY}`, () => {
      assertSectionStartContent.startNow.linkRedirection({
        currentUrl: insurancePolicyRootUrl,
        expectedUrl: `${baseUrl}${typeOfPolicyUrl}`,
      });
    });
  });

  describe('when clicking the `all sections` link', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      assertSectionStartContent.allSections.linkRedirection({
        currentUrl: insurancePolicyRootUrl,
        expectedUrl: `${baseUrl}${allSectionsUrl}`,
      });
    });
  });
});
