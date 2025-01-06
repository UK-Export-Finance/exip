import account from './account';
import APIM from './APIM';
import application from './application';
import applications from './applications';
import countries from './countries';
import getCompaniesHouseInformation from './get-companies-house-information';
import getOrdnanceSurveyAddress from './get-ordnance-survey-address';
import page from './page';
import feedback from './feedback';

const keystone = {
  account,
  APIM,
  application,
  applications,
  countries,
  getCompaniesHouseInformation,
  getOrdnanceSurveyAddress,
  page,
  feedback,
};

export default keystone;
