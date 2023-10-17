import { yesRadio, noRadio, submitButton } from '../../../pages/shared';

/**
 * selectRadioAndSubmit
 * Select a yes or no radio and submit the form
 * @param {String} Yes or no string
 */
const selectRadioAndSubmit = (answer) => {
  if (answer === 'yes') {
    yesRadio().input().click();
  }

  if (answer === 'no') {
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
  selectRadioAndSubmit('yes');
};

export const completeCompaniesHouseNumberForm = () => {
  selectRadioAndSubmit('yes');
};

export const completeInsuredAmountForm = () => {
  selectRadioAndSubmit('no');
};

export const completeInsuredPeriodForm = () => {
  selectRadioAndSubmit('no');
};

export const completeUkGoodsAndServicesForm = () => {
  selectRadioAndSubmit('yes');
};

export const completeEligibleToApplyOnlineForm = () => {
  submitButton().click();
};

export const completeAccountToApplyOnlineForm = () => {
  selectRadioAndSubmit('yes');
};
