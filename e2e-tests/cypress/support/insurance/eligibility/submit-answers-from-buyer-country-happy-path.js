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

export default () => {
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
