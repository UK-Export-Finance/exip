import { FIELD_VALUES } from '../../../constants';
import {
  yesRadio, noRadio, submitButton, field,
} from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { FIELDS_ELIGIBILITY } from '../../../content-strings/fields/insurance/eligibility';

const {
  ELIGIBILITY: { TOTAL_CONTRACT_VALUE },
} = INSURANCE_FIELD_IDS;

const { ABOVE, BELOW } = FIELDS_ELIGIBILITY[TOTAL_CONTRACT_VALUE].OPTIONS;

/**
 * selectRadioAndSubmit
 * Select a yes or no radio and submit the form
 * @param {String} Yes or no string
 */
const selectRadioAndSubmit = (answer) => {
  if (answer === FIELD_VALUES.YES) {
    yesRadio().input().click();
  }

  if (answer === FIELD_VALUES.NO) {
    noRadio().input().click();
  }

  submitButton().click();
};

export const completeStartForm = () => {
  submitButton().click();
};

export const completeCheckIfEligibleForm = () => {
  submitButton().click();
};

export const completeExporterLocationForm = () => {
  selectRadioAndSubmit(FIELD_VALUES.YES);
};

export const completeCompaniesHouseNumberForm = () => {
  selectRadioAndSubmit(FIELD_VALUES.YES);
};

export const completeCompanyDetailsForm = () => {
  submitButton().click();
};

/**
 * completeAndSubmitTotalValueInsuredForm
 * completes and submits the total value insured form
 * either selects above or below maximum value based on param
 * @param {Boolean} underThreshold - if above or below maximum value radio should be selected
 */
export const completeAndSubmitTotalValueInsuredForm = ({ underThreshold = true }) => {
  let fieldId = `${TOTAL_CONTRACT_VALUE}-${ABOVE.ID}`;

  if (underThreshold) {
    fieldId = `${TOTAL_CONTRACT_VALUE}-${BELOW.ID}`;
  }

  field(fieldId).input().click();
  submitButton().click();
};

export const completeInsuredPeriodForm = () => {
  selectRadioAndSubmit(FIELD_VALUES.NO);
};

export const completeUkGoodsAndServicesForm = () => {
  selectRadioAndSubmit(FIELD_VALUES.YES);
};

export const completeEligibleToApplyOnlineForm = () => {
  submitButton().click();
};

export const completeAccountToApplyOnlineForm = () => {
  selectRadioAndSubmit(FIELD_VALUES.YES);
};
