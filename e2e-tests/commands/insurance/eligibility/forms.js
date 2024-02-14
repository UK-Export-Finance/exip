import { yesRadio, noRadio, submitButton } from '../../../pages/shared';

export const completeStartForm = () => {
  submitButton().click();
};

export const completeCheckIfEligibleForm = () => {
  submitButton().click();
};

export const completeExporterLocationForm = () => {
  yesRadio().label().click();
  submitButton().click();
};

export const completeUkGoodsAndServicesForm = () => {
  yesRadio().label().click();
  submitButton().click();
};

export const completeInsuredAmountForm = () => {
  noRadio().label().click();
  submitButton().click();
};

export const completeInsuredPeriodForm = () => {
  noRadio().label().click();
  submitButton().click();
};

export const completeOtherPartiesForm = () => {
  noRadio().label().click();
  submitButton().click();
};

export const completeLetterOfCreditForm = () => {
  noRadio().label().click();
  submitButton().click();
};

export const completePreCreditPeriodForm = () => {
  noRadio().label().click();
  submitButton().click();
};

export const completeCompaniesHouseNumberForm = () => {
  yesRadio().label().click();
  submitButton().click();
};

export const completeEligibleToApplyOnlineForm = () => {
  submitButton().click();
};

export const completeAccountToApplyOnlineForm = () => {
  yesRadio().label().click();
  submitButton().click();
};
