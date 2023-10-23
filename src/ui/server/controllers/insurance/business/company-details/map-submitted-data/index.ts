import { RequestBody, Application } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import getSicCodeIDsFromApplication from '../../../../../helpers/get-sic-code-ids-from-application';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      COMPANY_NUMBER,
      COMPANY_INCORPORATED,
      OLD_SIC_CODES,
      REGISTED_OFFICE_ADDRESS: { ADDRESS_LINE_1, ADDRESS_LINE_2, CARE_OF, LOCALITY, REGION, POSTAL_CODE, COUNTRY, PREMISES },
    },
    YOUR_COMPANY: { ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

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
    populatedData[ADDRESS] = {
      [ADDRESS_LINE_1]: registeredOfficeAddress[ADDRESS_LINE_1] ?? '',
      [ADDRESS_LINE_2]: registeredOfficeAddress[ADDRESS_LINE_2] ?? '',
      [CARE_OF]: registeredOfficeAddress[CARE_OF] ?? '',
      [LOCALITY]: registeredOfficeAddress[LOCALITY] ?? '',
      [REGION]: registeredOfficeAddress[REGION] ?? '',
      [POSTAL_CODE]: registeredOfficeAddress[POSTAL_CODE] ?? '',
      [COUNTRY]: registeredOfficeAddress[COUNTRY] ?? '',
      [PREMISES]: registeredOfficeAddress[PREMISES] ?? '',
    };
    // removes registeredOfficeAddress as not required for database
    delete populatedData.registeredOfficeAddress;
  }

  // only delete existing sic codes if company has been inputted
  if (objectHasProperty(populatedData, COMPANY_NUMBER)) {
    // generates array of objects for sic codes to delete from existing application
    populatedData[OLD_SIC_CODES] = [...getSicCodeIDsFromApplication(application)];
  }

  // convert and populate company number and delete the companies house input field
  if (objectHasProperty(populatedData, COMPANY_NUMBER)) {
    if (populatedData[COMPANY_NUMBER]) {
      populatedData[COMPANY_NUMBER] = populatedData[COMPANY_NUMBER].toString();
    }

    delete populatedData[COMPANY_NUMBER];
  }

  if (objectHasProperty(populatedData, COMPANY_INCORPORATED)) {
    // convert from string to timestamp
    populatedData[COMPANY_INCORPORATED] = new Date(populatedData[COMPANY_INCORPORATED]).toISOString();
  }

  return populatedData;
};

export default mapSubmittedData;
