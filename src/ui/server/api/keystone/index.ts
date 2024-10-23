import account from './account';
import APIM from './APIM';
import application from './application';
import applications from './applications';
import countries from './countries';
import getCountriesAndCurrencies from './get-countries-and-currencies';
import getCompaniesHouseInformation from './get-companies-house-information';
import getOrdnanceSurveyAddress from './get-ordnance-survey-address';
import feedback from './feedback';

const keystone = {
  account,
  APIM,
  application,
  applications,
  countries,
  getCountriesAndCurrencies,
  getCompaniesHouseInformation,
  getOrdnanceSurveyAddress,
  feedback,
};

export default keystone;
