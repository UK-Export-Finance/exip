import {
  headingCaption,
  yesRadio,
  yesNoRadioHint,
  noRadio,
  field as fieldSelector,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import {
  BUTTONS,
  PAGES,
  PRE_CREDIT_PERIOD_DESCRIPTION as PRE_CREDIT_PERIOD_DESCRIPTION_STRINGS,
} from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const { preCreditPeriodDescription } = partials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD;

const {
  ROOT,
  POLICY: { BROKER_ROOT, NAME_ON_POLICY, PRE_CREDIT_PERIOD },
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD, PRE_CREDIT_PERIOD_DESCRIPTION,
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const story = 'As an exporter, I want to state whether I require pre-credit cover, So that I can be insured against costs accrued for preparation of the good or service I am exporting if needed';

context(`Insurance - Policy - Pre-credit period page - ${story}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm();
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;

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
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
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

    describe(PRE_CREDIT_PERIOD_DESCRIPTION, () => {
      const fieldId = PRE_CREDIT_PERIOD_DESCRIPTION;
      const field = fieldSelector(fieldId);

      it('should NOT by visible by default', () => {
        field.textarea().should('not.be.visible');
      });

      describe(`when clicking ${NEED_PRE_CREDIT_PERIOD} 'yes' radio`, () => {
        it(`should render ${fieldId} label and input`, () => {
          yesRadio().input().click();

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
      } = PRE_CREDIT_PERIOD_DESCRIPTION_STRINGS;

      it('renders summary text', () => {
        cy.checkText(preCreditPeriodDescription.summary(), INTRO);

        preCreditPeriodDescription.details().should('not.have.attr', 'open');
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `description` content', () => {
          cy.checkText(preCreditPeriodDescription.protectsYou(), PROTECTS_YOU);
          cy.checkText(preCreditPeriodDescription.insuresYou(), INSURES_YOU);
          cy.checkText(preCreditPeriodDescription.happensBefore(), HAPPENS_BEFORE);
        });
      });
    });
  });

  context('form submission', () => {
    it(`should redirect to ${BROKER_ROOT}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitPreCreditPeriodForm({});

      const expected = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ROOT}`;

      cy.assertUrl(expected);
    });
  });
});
