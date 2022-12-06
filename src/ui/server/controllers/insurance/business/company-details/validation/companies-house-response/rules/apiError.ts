import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { CompanyHouseResponse } from '../../../../../../../../types';

const {
  COMPANY_HOUSE: { INPUT },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * validates if there is an API error
 * throws validation errors if responseBody is null or if apiError flag is set to true
 * @param responseBody containing an object with the companies house API response
 * @returns object containing errors or blank object
 */
const apiError = (responseBody: CompanyHouseResponse, errors: object) => {
  let updatedErrors = errors;

  // if flag is set, then error with companies house API or if responseBody is totally empty
  if (!responseBody || !Object.keys(responseBody)?.length || responseBody.apiError) {
    const errorMessage = EXPORTER_BUSINESS[INPUT].TECHNICAL_ISSUES;
    updatedErrors = generateValidationErrors(INPUT, errorMessage, errors);
  }

  return updatedErrors;
};

export default apiError;
