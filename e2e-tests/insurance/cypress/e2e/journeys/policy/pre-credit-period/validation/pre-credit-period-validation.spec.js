import {
  headingCaption,
  yesRadio,
  yesNoRadioHint,
  noRadio,
  field,
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
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const { preCreditPeriodDescription } = partials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD;

const {
  ROOT,
  POLICY: { PRE_CREDIT_PERIOD, BROKER_ROOT },
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD, PRE_CREDIT_PERIOD_DESCRIPTION,
} = POLICY_FIELD_IDS;

const POLICY_ERROR_MESSAGES = ERROR_MESSAGES.INSURANCE.POLICY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Pre-credit period page - validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;

      cy.navigateToUrl(url);
      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render a validation error when ${NEED_PRE_CREDIT_PERIOD} is not provided`, () => {
    const fieldId = NEED_PRE_CREDIT_PERIOD;

    const expectedErrorsCount = 1;
    const expectedErrorMessage = POLICY_ERROR_MESSAGES[fieldId].IS_EMPTY;

    cy.submitAndAssertRadioErrors(
      field(fieldId),
      0,
      expectedErrorsCount,
      expectedErrorMessage,
    );
  });

  // TODO - when the radio is "no"

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is 'yes'`, () => {
    beforeEach(() => {
      yesRadio().input().click();
    });

    it(`should render a validation error when ${PRE_CREDIT_PERIOD_DESCRIPTION} is not provided`, () => {
      const fieldId = PRE_CREDIT_PERIOD_DESCRIPTION;

      const expectedErrorsCount = 1;
      const expectedErrorMessage = POLICY_ERROR_MESSAGES[fieldId].IS_EMPTY;

      cy.submitAndAssertRadioErrors(
        field(fieldId),
        0,
        expectedErrorsCount,
        expectedErrorMessage,
      );
    });

    // it(`should render a validation error when ${PRE_CREDIT_PERIOD_DESCRIPTION} is above the maximum`, () => {
    //   const fieldId = PRE_CREDIT_PERIOD_DESCRIPTION;

    //   const expectedErrorsCount = 1;
    //   const expectedErrorMessage = POLICY_ERROR_MESSAGES[fieldId].IS_EMPTY;

    //   cy.submitAndAssertRadioErrors(
    //     field(fieldId),
    //     0,
    //     expectedErrorsCount,
    //     expectedErrorMessage,
    //   );
    // });
  });
});
