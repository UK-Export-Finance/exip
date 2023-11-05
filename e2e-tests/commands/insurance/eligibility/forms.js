import { yesRadio, noRadio, submitButton } from '../../../pages/shared';

export const completeStartForm = () => {
  submitButton().click();
};

export const completeCheckIfEligibleForm = () => {
  submitButton().click();
};

export const completeExporterLocationForm = () => {
  yesRadio().input().click();
  submitButton().click();
};

export const completeUkGoodsAndServicesForm = () => {
  yesRadio().input().click();
  submitButton().click();
};

export const completeInsuredAmountForm = () => {
  noRadio().input().click();
  submitButton().click();
};

export const completeInsuredPeriodForm = () => {
  noRadio().input().click();
  submitButton().click();
};

export const completeOtherPartiesForm = () => {
  noRadio().input().click();
  submitButton().click();
};

export const completeLetterOfCreditForm = () => {
  noRadio().input().click();
  submitButton().click();
};

export const completePreCreditPeriodForm = () => {
  noRadio().input().click();
  submitButton().click();
};

export const completeCompaniesHouseNumberForm = () => {
  yesRadio().input().click();
  submitButton().click();
};

export const completeEligibleToApplyOnlineForm = () => {
  submitButton().click();
};

export const completeAccountToApplyOnlineForm = () => {
  yesRadio().input().click();
  submitButton().click();
};
