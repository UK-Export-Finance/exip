import partials from '../../../../../../partials';
import {
  listIntro,
  listItem,
  outro,
  startNowLink,
  allSectionsLink,
} from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

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

context('Insurance - Insurance policy - start page - As an Exporter, I want to provide the details of the export transaction that I need a cover for, So that UKEF can issue a credit insurance cover that meet my export transaction need', () => {
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
      assertSubmitButton: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(insurancePolicyRootUrl);
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
        typeOfPolicyUrl,
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
    it(`should redirect to ${TYPE_OF_POLICY}`, () => {
      cy.navigateToUrl(insurancePolicyRootUrl);

      startNowLink().click();

      cy.assertUrl(`${baseUrl}${typeOfPolicyUrl}`);
    });
  });

  describe('when clicking the `all sections` link', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(insurancePolicyRootUrl);

      allSectionsLink().click();

      cy.assertUrl(`${baseUrl}${allSectionsUrl}`);
    });
  });
});
