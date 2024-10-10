import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { radios, field } from '../../pages/shared';
import application from '../../fixtures/application';
import { NON_STANDARD_CURRENCY_CODE } from '../../fixtures/currencies';

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
    },
  },
} = INSURANCE_FIELD_IDS;

const { day, month, year } = application.POLICY[REQUESTED_START_DATE];

/**
 * completeMultipleContractPolicyForm
 * Complete the "multiple contract policy" form
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrency: Select the "alternative currency" option
 * @param {Boolean} chooseCurrency: Whether to choose a currency or not
 */
const completeMultipleContractPolicyForm = ({ isoCode = application.POLICY[POLICY_CURRENCY_CODE], alternativeCurrency = false, chooseCurrency = true }) => {
  cy.completeDateFormFields({ idPrefix: REQUESTED_START_DATE, day, month, year });

  cy.keyboardInput(field(TOTAL_MONTHS_OF_COVER).input(), application.POLICY[TOTAL_MONTHS_OF_COVER]);

  if (chooseCurrency) {
    if (alternativeCurrency) {
      cy.clickAlternativeCurrencyRadioAndCompleteCurrency({
        currency: NON_STANDARD_CURRENCY_CODE,
      });
    } else {
      radios(CURRENCY_CODE, isoCode).option.label().click();
    }
  }
};

export default completeMultipleContractPolicyForm;
