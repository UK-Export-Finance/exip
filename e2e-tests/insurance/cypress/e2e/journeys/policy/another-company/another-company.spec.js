import {
  field as fieldSelector,
  headingCaption,
  yesRadio,
  yesNoRadioHint,
  noRadio,
  noRadioInput,
} from '../../../../../../pages/shared';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.ANOTHER_COMPANY;

const {
  ROOT,
  POLICY: {
    ANOTHER_COMPANY,
    PRE_CREDIT_PERIOD,
    BROKER_ROOT,
    OTHER_COMPANY_DETAILS,
  },
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    REQUESTED: FIELD_ID,
  },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      REQUESTED_JOINTLY_INSURED_PARTY: {
        [FIELD_ID]: {
          IS_EMPTY: EXPECTED_ERROR_MESSAGE,
        },
      },
    },
  },
} = ERROR_MESSAGES;

const ERROR_ASSERTIONS = {
  field: fieldSelector(FIELD_ID),
  numberOfExpectedErrors: 1,
  errorIndex: 0,
};

const baseUrl = Cypress.config('baseUrl');

const story = 'As an exporter, I want to inform UKEF of any other company I would like to include on my policy, So that cover is available for all appropriate parties';

context(`Insurance - Policy - Another company page - ${story}`, () => {
  let referenceNumber;
  let url;
  let brokerUrl;
  let otherCompanyDetailsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${ANOTHER_COMPANY}`;
      brokerUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ROOT}`;
      otherCompanyDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS}`;

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
      currentHref: `${ROOT}/${referenceNumber}${ANOTHER_COMPANY}`,
      backLink: `${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });

    describe(`renders ${FIELD_ID}`, () => {
      it('renders a hint', () => {
        cy.checkText(yesNoRadioHint(), FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[FIELD_ID].HINT);
      });

      it('renders `yes` and `no` radio buttons in the correct order', () => {
        cy.assertYesNoRadiosOrder({ noRadioFirst: true });
      });

      it('renders `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      const errorMessage = EXPECTED_ERROR_MESSAGE;

      it(`should render a validation error if ${FIELD_ID} radio is not selected`, () => {
        cy.navigateToUrl(url);

        const { numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

        const radioField = {
          ...fieldSelector(FIELD_ID),
          input: noRadioInput,
        };

        cy.submitAndAssertRadioErrors(radioField, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });

    describe('when submitting the answer as `no`', () => {
      it(`should redirect to ${BROKER_ROOT}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitAnotherCompanyForm({});

        cy.assertUrl(brokerUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.assertNoRadioOptionIsChecked();
        });
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${OTHER_COMPANY_DETAILS}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved: true });

        cy.assertUrl(otherCompanyDetailsUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.assertYesRadioOptionIsChecked();
        });
      });
    });
  });
});
