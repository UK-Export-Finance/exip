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
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import account from '../../../../../../fixtures/account';
import application from '../../../../../../fixtures/application';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.NAME_ON_POLICY;

const {
  ROOT: INSURANCE_ROOT,
  POLICY_AND_EXPORTS: {
    ABOUT_GOODS_OR_SERVICES,
    CHECK_YOUR_ANSWERS,
    NAME_ON_POLICY,
    DIFFERENT_NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY_AND_EXPORTS: {
    NAME_ON_POLICY: {
      NAME, POSITION, SAME_NAME, OTHER_NAME,
    },
  },
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Name on Policy page - I want to enter the details of my export and policy, So that UKEF will have clarity on who to contact while processing my Export Insurance Application', () => {
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

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`,
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
      cy.checkText(input.field(NAME).hint(), CONTENT_STRINGS.HINT);
    });

    it(`renders a ${SAME_NAME} radio`, () => {
      input.field(SAME_NAME).input().should('exist');

      const nameAndEmail = `${account[FIRST_NAME]} ${account[LAST_NAME]} (${account[EMAIL]})`;
      cy.checkText(input.field(SAME_NAME).label(), nameAndEmail);
    });

    it(`renders ${POSITION} input if ${SAME_NAME} is selected'`, () => {
      input.field(SAME_NAME).input().click();

      input.field(POSITION).input().should('exist');
      cy.checkText(input.field(POSITION).label(), FIELDS.NAME_ON_POLICY[POSITION].LABEL);
    });

    it(`renders a ${OTHER_NAME} radio'`, () => {
      input.field(OTHER_NAME).input().should('exist');

      cy.checkText(input.field(OTHER_NAME).label(), FIELDS.NAME_ON_POLICY.OPTIONS.OTHER_NAME.TEXT);
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    describe(SAME_NAME, () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS} when ${SAME_NAME} is selected`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitNameOnPolicyForm({ sameName: true });

        const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          const { POLICY_CONTACT } = application;

          cy.navigateToUrl(url);

          input.field(SAME_NAME).input().should('be.checked');
          cy.checkValue(input.field(POSITION), POLICY_CONTACT[POSITION]);
        });
      });
    });

    describe(OTHER_NAME, () => {
      it(`should redirect to ${DIFFERENT_NAME_ON_POLICY} when ${OTHER_NAME} is selected`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitNameOnPolicyForm({});

        const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;
        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          input.field(OTHER_NAME).input().should('be.checked');
        });
      });
    });
  });
});
