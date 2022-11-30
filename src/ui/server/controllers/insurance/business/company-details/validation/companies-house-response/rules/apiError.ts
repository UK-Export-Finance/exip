import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { CompanyHouseResponse } from '../../../../../../../../types';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

const apiError = (responseBody: CompanyHouseResponse, errors: object) => {
  let updatedErrors = errors;

  // if flag is set, then error with companies house API
  if (responseBody.apiError) {
    const errorMessage = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].TECHNICAL_ISSUES;
    updatedErrors = generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, errors);
  }

  return updatedErrors;
};

export default apiError;
