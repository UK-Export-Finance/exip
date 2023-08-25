import { completeAndSubmitBuyerCountryForm } from '../../forms';
import {
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
  completePreCreditPeriodForm,
  completeCompaniesHouseNumberForm,
  completeEligibleToApplyOnlineForm,
} from './forms';

/**
 * checkAuthHeader
 * Run authenticated header check if flag is true
 * @param {Boolean} assertAuthenticatedHeader
 */
const checkAuthHeader = (assertAuthenticatedHeader) => {
  if (assertAuthenticatedHeader) {
    cy.checkAuthenticatedHeader();
  }
};

/**
 * submitAnswersFromBuyerCountryHappyPath
 * Check the auth header before submitting an eligibility fom
 * @param {Boolean} assertAuthenticatedHeader
 */
const submitAnswersFromBuyerCountryHappyPath = (assertAuthenticatedHeader = false) => {
  checkAuthHeader(assertAuthenticatedHeader);

  completeAndSubmitBuyerCountryForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeExporterLocationForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeUkGoodsAndServicesForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeInsuredAmountForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeInsuredPeriodForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeOtherPartiesForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeLetterOfCreditForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completePreCreditPeriodForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeCompaniesHouseNumberForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeEligibleToApplyOnlineForm();

  checkAuthHeader(assertAuthenticatedHeader);
};

export default submitAnswersFromBuyerCountryHappyPath;
