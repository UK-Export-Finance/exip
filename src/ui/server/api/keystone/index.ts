import account from './account';
import APIM from './APIM';
import application from './application';
import applications from './applications';
import countries from './countries';
import getCountriesAndCurrencies from './get-countries-and-currencies';
import getCompaniesHouseInformation from './get-companies-house-information';
import getOrdnanceSurveyAddresses from './get-ordnance-survey-addresses';
import feedback from './feedback';

const keystone = {
  account,
  APIM,
  application,
  applications,
  countries,
  getCountriesAndCurrencies,
  getCompaniesHouseInformation,
  getOrdnanceSurveyAddresses,
  feedback,
};

export default keystone;
