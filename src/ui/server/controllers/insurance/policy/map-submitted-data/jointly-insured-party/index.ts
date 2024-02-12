import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import getCountryByIsoCode from '../../../../../helpers/get-country-by-iso-code';
import { objectHasProperty } from '../../../../../helpers/object';
import { Application, Country, RequestBody } from '../../../../../../types';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY },
} = POLICY_FIELD_IDS;

/**
 * mapSubmittedData
 * if REQUESTED is false, wipe "other company"/"jointly insured party" data.
 * @param {Express.Request.body} Form data
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody, application: Application, countries?: Array<Country>): object => {
  const populatedData = formBody;

  const {
    policy: { jointlyInsuredParty },
  } = application;

  // TODO: this will not work when changing requested from true to false.
  if (!populatedData[REQUESTED] && !jointlyInsuredParty[REQUESTED]) {
    populatedData[COMPANY_NAME] = '';
    populatedData[COMPANY_NUMBER] = '';
    populatedData[COUNTRY] = null;
  }

  const hasCountry = objectHasProperty(populatedData, COUNTRY);

  if (countries && hasCountry) {
    const countryObj = getCountryByIsoCode(countries, populatedData[COUNTRY]);

    populatedData[COUNTRY] = countryObj.isoCode;
  }

  return populatedData;
};

export default mapSubmittedData;
