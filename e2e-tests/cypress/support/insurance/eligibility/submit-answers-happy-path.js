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
} from './forms';
import { completeAndSubmitBuyerCountryForm } from '../../forms'

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
};
