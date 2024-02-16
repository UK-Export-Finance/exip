import { field, headingCaption } from '../../../../../../pages/shared';
import { insurance } from '../../../../../../pages';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { APPLICATION, FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: {
    ROOT: POLICY_ROOT,
    TYPE_OF_POLICY,
    SINGLE_CONTRACT_POLICY,
    MULTIPLE_CONTRACT_POLICY,
  },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.TYPE_OF_POLICY;

const FIELD_ID = FIELD_IDS.INSURANCE.POLICY.POLICY_TYPE;

const singlePolicyField = insurance.policy.typeOfPolicyPage[FIELD_ID].single;
const multiplePolicyField = insurance.policy.typeOfPolicyPage[FIELD_ID].multiple;

const goToPageDirectly = (referenceNumber) => {
  cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`);
};

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Type of policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${POLICY_ROOT}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders `single` radio input with label and hint text list', () => {
      singlePolicyField.input().should('exist');
      cy.checkText(singlePolicyField.label(), FIELDS[FIELD_ID].OPTIONS.SINGLE.TEXT);

      cy.checkText(singlePolicyField.hintList.item1(), FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[0]);

      cy.checkText(singlePolicyField.hintList.item2(), FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[1]);

      cy.checkText(singlePolicyField.hintList.item3(), FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[2]);

      cy.checkText(singlePolicyField.hintList.item4(), FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[3]);
    });

    it('renders `multiple` radio input with label and hint text list', () => {
      multiplePolicyField.input().should('exist');
      cy.checkText(multiplePolicyField.label(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.TEXT);

      cy.checkText(multiplePolicyField.hintList.item1(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.HINT_LIST[0]);

      cy.checkText(multiplePolicyField.hintList.item2(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.HINT_LIST[1]);

      cy.checkText(multiplePolicyField.hintList.item3(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.HINT_LIST[2]);
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a validation error', () => {
        const expectedErrorsCount = 1;

        const { errorMessage } = field(FIELD_ID);

        const radioField = {
          ...singlePolicyField,
          errorMessage,
        };

        cy.submitAndAssertRadioErrors(
          radioField,
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.POLICY.TYPE_OF_POLICY[FIELD_ID].IS_EMPTY,
        );
      });
    });

    describe('when submitting the answer as `single`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${SINGLE_CONTRACT_POLICY}`, () => {
        singlePolicyField.label().click();

        cy.clickSubmitButton();

        const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

        cy.assertUrl(expected);
      });

      it('should have the originally submitted answer selected when going back to the page', () => {
        goToPageDirectly(referenceNumber);

        cy.assertRadioOptionIsChecked(singlePolicyField.input());
      });
    });

    describe('when submitting the answer as `multiple`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${MULTIPLE_CONTRACT_POLICY}`, () => {
        cy.completeAndSubmitPolicyTypeForm({ policyType: APPLICATION.POLICY_TYPE.MULTIPLE });

        const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

        cy.assertUrl(expected);
      });

      it('should have the originally submitted answer selected when going back to the page', () => {
        goToPageDirectly(referenceNumber);

        cy.assertRadioOptionIsChecked(multiplePolicyField.input());
      });
    });

    describe('after submitting an answer', () => {
      it('should update the status of task `type of policy` to `in progress`', () => {
        cy.navigateToUrl(url);

        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);

        cy.checkTaskPolicyStatusIsInProgress();
      });
    });
  });
});
