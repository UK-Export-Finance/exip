import {
  headingCaption,
  heading,
  submitButton,
  saveAndBackButton,
} from '../../../../pages/shared';
import { typeOfPolicyPage, aboutGoodsOrServicesPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import {
  BUTTONS,
  LINKS,
  ORGANISATION,
  PAGES,
} from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES;

const singlePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const singlePolicyField = typeOfPolicyPage[singlePolicyFieldId].single;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    START,
    POLICY_AND_EXPORTS: {
      SINGLE_CONTRACT_POLICY,
      ABOUT_GOODS_OR_SERVICES,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
    },
  },
} = FIELD_IDS;

const goToPageDirectly = (referenceNumber) => {
  cy.visit(`${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`, {
    auth: {
      username: Cypress.config('basicAuthKey'),
      password: Cypress.config('basicAuthSecret'),
    },
  });
};

context('Insurance - Policy and exports - About goods or services page - As an exporter, I want to enter the details of the export contract', () => {
  let referenceNumber;

  before(() => {
    cy.visit(START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();
    singlePolicyField.input().click();
    submitButton().click();

    cy.completeAndSubmitAboutGoodsOrServicesForm();

    getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

    cy.url().should('eq', expectedUrl);

    goToPageDirectly(referenceNumber);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a page title and heading with caption', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    headingCaption().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING_CAPTION);
    });

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('renders `description` label, hint, prefix and input', () => {
    const fieldId = DESCRIPTION;
    const field = aboutGoodsOrServicesPage[fieldId];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].LABEL);
    });

    field.hint.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.INTRO);
    });

    field.hint.list.item1().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.LIST[0]);
    });

    field.hint.list.item2().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.LIST[1]);
    });

    field.hint.list.item3().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.LIST[2]);
    });

    field.input().should('exist');
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  it('renders a `save and back` button', () => {
    saveAndBackButton().should('exist');

    saveAndBackButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.SAVE_AND_BACK);
    });
  });
});
