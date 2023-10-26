import { FIELD_VALUES } from '../../../constants';
import { yesRadio, noRadio, submitButton } from '../../../pages/shared';

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

export const completeInsuredAmountForm = () => {
  selectRadioAndSubmit(FIELD_VALUES.NO);
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
