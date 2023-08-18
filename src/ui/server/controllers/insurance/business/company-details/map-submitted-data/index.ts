import { RequestBody, Application } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import { FIELD_IDS } from '../../../../../constants';
import getSicCodeIDsFromApplication from '../../../../../helpers/get-sic-code-ids-from-application';

const {
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE_NUMBER,
    COMPANY_HOUSE: { COMPANY_NUMBER, COMPANY_INCORPORATED },
  },
} = FIELD_IDS.INSURANCE;

/**
 * maps companyDetails formBody and returns fields in correct format
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody, application: Application): object => {
  const { __typename, success, _csrf, apiError, ...populatedData } = formBody;

  if (!populatedData.registeredOfficeAddress) {
    // create empty companyAddress if not part of request
    populatedData.address = {};
  } else {
    const { registeredOfficeAddress } = populatedData;

    // populates companyAddress for db with value or empty string if null
    populatedData.address = {
      addressLine1: registeredOfficeAddress.addressLine1 ?? '',
      addressLine2: registeredOfficeAddress.addressLine2 ?? '',
      careOf: registeredOfficeAddress.careOf ?? '',
      locality: registeredOfficeAddress.locality ?? '',
      region: registeredOfficeAddress.region ?? '',
      postalCode: registeredOfficeAddress.postalCode ?? '',
      country: registeredOfficeAddress.country ?? '',
      premises: registeredOfficeAddress.premises ?? '',
    };
    // removes registeredOfficeAddress as not required for database
    delete populatedData.registeredOfficeAddress;
  }

  // only delete existing sic codes if company has been inputted
  if (objectHasProperty(populatedData, COMPANIES_HOUSE_NUMBER)) {
    // generates array of objects for sic codes to delete from existing application
    populatedData.oldSicCodes = [...getSicCodeIDsFromApplication(application)];
  }

  // convert and populate company number and delete the companies house input field
  if (objectHasProperty(populatedData, COMPANIES_HOUSE_NUMBER)) {
    if (populatedData[COMPANY_NUMBER]) {
      populatedData[COMPANY_NUMBER] = populatedData[COMPANY_NUMBER].toString();
    }

    delete populatedData[COMPANIES_HOUSE_NUMBER];
  }

  if (objectHasProperty(populatedData, COMPANY_INCORPORATED)) {
    // convert from string to timestamp
    populatedData[COMPANY_INCORPORATED] = new Date(populatedData[COMPANY_INCORPORATED]).toISOString();
  }

  return populatedData;
};

export default mapSubmittedData;
