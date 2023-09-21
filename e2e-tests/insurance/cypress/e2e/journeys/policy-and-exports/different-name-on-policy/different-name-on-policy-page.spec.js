import {
  headingCaption,
  saveAndBackButton,
  input,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import {
  BUTTONS,
  PAGES,
} from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { ACCOUNT_FIELDS } from '../../../../../../content-strings/fields/insurance/account';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.DIFFERENT_NAME_ON_POLICY;

const {
  ROOT: INSURANCE_ROOT,
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    NAME_ON_POLICY,
    DIFFERENT_NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY_AND_EXPORTS: {
    DIFFERENT_NAME_ON_POLICY: {
      POSITION, POLICY_CONTACT_DETAIL,
    },
  },
  ACCOUNT: {
    FIRST_NAME, LAST_NAME, EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Different name on Policy page - I want to enter the details of my export application contact, So that UKEF will have clarity on who to contact while processing my Export Insurance Application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();
      cy.completeAndSubmitNameOnPolicyForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a hint', () => {
      cy.checkText(input.field(POLICY_CONTACT_DETAIL).hint(), CONTENT_STRINGS.HINT);
    });

    it(`should display ${FIRST_NAME} field and be prepopulated`, () => {
      const fieldId = FIRST_NAME;
      const field = input.field(fieldId);

      field.input().should('exist');

      cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
    });

    it(`should display ${LAST_NAME} field and be prepopulated`, () => {
      const fieldId = LAST_NAME;
      const field = input.field(fieldId);

      field.input().should('exist');

      cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
    });

    it(`should display ${EMAIL} field and be prepopulated`, () => {
      const fieldId = EMAIL;
      const field = input.field(fieldId);

      field.input().should('exist');

      cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
    });

    it(`should display ${POSITION} field and should not be prepopulated`, () => {
      const fieldId = POSITION;
      const field = input.field(fieldId);

      field.input().should('exist');

      cy.checkText(field.label(), FIELDS.DIFFERENT_NAME_ON_POLICY[fieldId].LABEL);
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitDifferentNameOnPolicyForm();

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.assertUrl(expectedUrl);
    });
  });
});
