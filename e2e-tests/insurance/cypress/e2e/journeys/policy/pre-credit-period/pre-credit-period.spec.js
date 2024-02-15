import {
  headingCaption,
  yesRadio,
  yesNoRadioHint,
  noRadio,
  field as fieldSelector,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import {
  PAGES,
  CREDIT_PERIOD_WITH_BUYER as CREDIT_PERIOD_WITH_BUYER_STRINGS,
} from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import mockApplication from '../../../../../../fixtures/application';

const { creditPeriodWithBuyer } = partials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD;

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: { ANOTHER_COMPANY, NAME_ON_POLICY, PRE_CREDIT_PERIOD },
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER,
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const story = 'As an exporter, I want to state whether I require pre-credit cover, So that I can be insured against costs accrued for preparation of the good or service I am exporting if needed';

context(`Insurance - Policy - Pre-credit period page - ${story}`, () => {
  let referenceNumber;
  let url;
  let anotherCompanyUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;
      anotherCompanyUrl = `${baseUrl}${ROOT}/${referenceNumber}${ANOTHER_COMPANY}`;

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
      currentHref: `${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`,
      backLink: `${ROOT}/${referenceNumber}${NAME_ON_POLICY}`,
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

    describe(`renders ${NEED_PRE_CREDIT_PERIOD} label and inputs`, () => {
      it('renders a hint', () => {
        cy.checkText(yesNoRadioHint(), FIELDS[NEED_PRE_CREDIT_PERIOD].HINT);
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

    describe(CREDIT_PERIOD_WITH_BUYER, () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;
      const field = fieldSelector(fieldId);

      it('should NOT by visible by default', () => {
        field.textarea().should('not.be.visible');
      });

      describe(`when clicking ${NEED_PRE_CREDIT_PERIOD} 'yes' radio`, () => {
        it(`should render ${fieldId} label and input`, () => {
          cy.clickYesRadioInput();

          field.textarea().should('be.visible');

          cy.checkText(field.label(), FIELDS[fieldId].LABEL);
        });
      });
    });

    describe('expandable details - what is the pre-credit period', () => {
      const {
        INTRO,
        PROTECTS_YOU,
        INSURES_YOU,
        HAPPENS_BEFORE,
      } = CREDIT_PERIOD_WITH_BUYER_STRINGS;

      it('renders summary text', () => {
        cy.checkText(creditPeriodWithBuyer.summary(), INTRO);

        creditPeriodWithBuyer.details().should('not.have.attr', 'open');
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `description` content', () => {
          cy.checkText(creditPeriodWithBuyer.protectsYou(), PROTECTS_YOU);
          cy.checkText(creditPeriodWithBuyer.insuresYou(), INSURES_YOU);
          cy.checkText(creditPeriodWithBuyer.happensBefore(), HAPPENS_BEFORE);
        });
      });
    });
  });

  context('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitPreCreditPeriodForm({});
    });

    it(`should redirect to ${ANOTHER_COMPANY}`, () => {
      cy.assertUrl(anotherCompanyUrl);
    });

    it('should retain the `type of policy` task status as `in progress` after submitting the form', () => {
      cy.navigateToUrl(`${ROOT}/${referenceNumber}${ALL_SECTIONS}`);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.assertNoRadioOptionIsChecked();
      });
    });

    describe(`when submitting ${NEED_PRE_CREDIT_PERIOD} as yes and submitting a ${CREDIT_PERIOD_WITH_BUYER}`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitPreCreditPeriodForm({ needPreCreditPeriod: true });
      });

      it(`should redirect to ${ANOTHER_COMPANY}`, () => {
        cy.assertUrl(anotherCompanyUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.assertYesRadioOptionIsChecked();

          const expectedValue = mockApplication.POLICY[CREDIT_PERIOD_WITH_BUYER];

          fieldSelector(CREDIT_PERIOD_WITH_BUYER).textarea().should('have.value', expectedValue);
        });
      });
    });
  });
});
