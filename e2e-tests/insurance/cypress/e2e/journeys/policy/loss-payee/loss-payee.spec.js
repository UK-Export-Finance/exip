import partials from '../../../../../../partials';
import { noRadio, yesRadio } from '../../../../../../pages/shared';
import { lossPayeePage } from '../../../../../../pages/insurance/policy';
import { PAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.LOSS_PAYEE;

const {
  LOSS_PAYEE: { IS_APPOINTED: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_ROOT,
    LOSS_PAYEE_ROOT,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const { LOSS_PAYEE: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Loss payee page - As an exporter, I want to inform UKEF about whether I have a loss payee, So that the appropriate parties can be paid in the event of an insurance claim', () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: false });

      url = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`;
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

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
      currentHref: `${ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${BROKER_ROOT}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a hint', () => {
      const {
        [FIELD_ID]: {
          HINT: { INTRO, OUTRO },
        },
      } = FIELD_STRINGS;

      cy.checkText(lossPayeePage.radioHint(FIELD_ID).intro(), INTRO);
      cy.checkText(lossPayeePage.radioHint(FIELD_ID).outro(), OUTRO);
    });

    it('renders a `no` radio button', () => {
      cy.checkText(noRadio().label(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders a `yes` radio button', () => {
      yesRadio().input().should('exist');

      cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `yes` and `no` radio buttons in the correct order', () => {
      cy.assertYesNoRadiosOrder({ noRadioFirst: true });
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
      cy.navigateToUrl(url);

      cy.clickSubmitButton();

      cy.assertUrl(checkYourAnswersUrl);
    });
  });
});
