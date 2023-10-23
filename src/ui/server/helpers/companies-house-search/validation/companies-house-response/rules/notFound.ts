import { ERROR_MESSAGES } from '../../../../../content-strings';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import generateValidationErrors from '../../../../validation';
import { CompanyHouseResponse } from '../../../../../../types';

const {
  ELIGIBILITY: {
    COMPANY_HOUSE: { COMPANY_NUMBER: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

const { ELIGIBILITY } = ERROR_MESSAGES.INSURANCE;

/**
 * validates company house API response
 * throws validation errors if success is false and if apiError is also false
 * only success: false returned if company not found
 * @param responseBody containing an object with the companies house API response
 * @returns object containing errors or blank object
 */
const notFound = (responseBody: CompanyHouseResponse, errors: object) => {
  let updatedErrors = errors;

  /**
   * If success is false,
   * the company cannot be found by companies house API.
   */
  if (responseBody.success === false && !responseBody.apiError) {
    const errorMessage = ELIGIBILITY[FIELD_ID].NOT_FOUND;

    updatedErrors = generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  return updatedErrors;
};

export default notFound;
