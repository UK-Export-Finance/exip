import { FIELD_VALUES } from '../../../constants';
import {
  yesRadio, noRadio, submitButton, field,
} from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { FIELDS_ELIGIBILITY } from '../../../content-strings/fields/insurance/eligibility';

const {
  ELIGIBILITY: { COVER_PERIOD, TOTAL_CONTRACT_VALUE },
} = INSURANCE_FIELD_IDS;

const {
  ABOVE: TOTAL_CONTRACT_VALUE_ABOVE,
  BELOW: TOTAL_CONTRACT_VALUE_BELOW,
} = FIELDS_ELIGIBILITY[TOTAL_CONTRACT_VALUE].OPTIONS;

const {
  ABOVE: COVER_PERIOD_ABOVE,
  BELOW: COVER_PERIOD_BELOW,
} = FIELDS_ELIGIBILITY[COVER_PERIOD].OPTIONS;

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
  let fieldId = `${TOTAL_CONTRACT_VALUE}-${TOTAL_CONTRACT_VALUE_ABOVE.ID}`;

  if (underThreshold) {
    fieldId = `${TOTAL_CONTRACT_VALUE}-${TOTAL_CONTRACT_VALUE_BELOW.ID}`;
  }

  field(fieldId).input().click();
  submitButton().click();
};

/**
 * completeCoverPeriodForm
 * completes and submits the cover period form
 * either selects less than or over X years based on param
 * @param {Boolean} underThreshold - if less than or over X years value radio should be selected
 */
export const completeCoverPeriodForm = ({ underThreshold = true }) => {
  let fieldId = `${COVER_PERIOD}-${COVER_PERIOD_ABOVE.ID}`;

  if (underThreshold) {
    fieldId = `${COVER_PERIOD}-${COVER_PERIOD_BELOW.ID}`;
  }

  field(fieldId).input().click();
  submitButton().click();
};

export const completeUkGoodsAndServicesForm = () => {
  selectRadioAndSubmit(FIELD_VALUES.YES);
};

export const completeEndBuyerForm = () => {
  selectRadioAndSubmit(FIELD_VALUES.NO);
};

export const submitCheckYourAnswers = () => {
  submitButton().click();
};

export const completeEligibleToApplyOnlineForm = () => {
  submitButton().click();
};

export const completeAccountToApplyOnlineForm = () => {
  selectRadioAndSubmit(FIELD_VALUES.YES);
};
