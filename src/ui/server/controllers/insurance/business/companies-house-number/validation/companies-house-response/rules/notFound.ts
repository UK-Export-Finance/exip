import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { CompanyHouseResponse } from '../../../../../../../../types';

const { COMPANIES_HOUSE_NUMBER } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * validates company house API response
 * throws validation errors if success is false and if apiError is also false
 * only success: false returned if company not found
 * @param responseBody containing an object with the companies house API response
 * @returns object containing errors or blank object
 */
const notFound = (responseBody: CompanyHouseResponse, errors: object) => {
  let updatedErrors = errors;

  // if success is false, then company cannot be found by companies house API
  if (responseBody.success === false && !responseBody.apiError) {
    const errorMessage = EXPORTER_BUSINESS[COMPANIES_HOUSE_NUMBER].NOT_FOUND;
    updatedErrors = generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, errors);
  }

  return updatedErrors;
};

export default notFound;
