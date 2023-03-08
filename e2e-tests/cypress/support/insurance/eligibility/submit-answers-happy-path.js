import { completeAndSubmitBuyerCountryForm } from '../../forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
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

export default () => {
  completeStartForm();
  completeCheckIfEligibleForm();
  completeAndSubmitBuyerCountryForm();
  completeExporterLocationForm();
  completeUkGoodsAndServicesForm();
  completeInsuredAmountForm();
  completeInsuredPeriodForm();
  completeOtherPartiesForm();
  completeLetterOfCreditForm();
  completePreCreditPeriodForm();
  completeCompaniesHouseNumberForm();
  completeEligibleToApplyOnlineForm();
};
