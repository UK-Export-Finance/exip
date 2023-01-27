import { RequestBody } from '../../../../../types';
import { objectHasProperty } from '../../../../helpers/object';
import { FIELD_IDS } from '../../../../constants';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { INPUT, COMPANY_NUMBER, COMPANY_INCORPORATED },
  },
} = FIELD_IDS.INSURANCE;

/**
 * maps companyDetails formBody and returns fields in correct format
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { __typename, success, _csrf, apiError, ...populatedData } = formBody;

  if (!populatedData.registeredOfficeAddress) {
    // create empty exporterCompanyAddress if not part of request
    populatedData.address = {};
  } else {
    const { registeredOfficeAddress } = populatedData;

    // populates exporterCompanyAddress for db with value or empty string if null
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

  // convert and populate company number and delete the companies house input field
  if (objectHasProperty(populatedData, INPUT)) {
    populatedData[COMPANY_NUMBER] = populatedData[INPUT].toString();

    delete populatedData[INPUT];
  }

  if (objectHasProperty(populatedData, COMPANY_INCORPORATED)) {
    // convert from string to timestamp
    populatedData[COMPANY_INCORPORATED] = new Date(populatedData[COMPANY_INCORPORATED]).toISOString();
  }

  return populatedData;
};

export default mapSubmittedData;
