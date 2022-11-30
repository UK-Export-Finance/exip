import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { CompanyHouseResponse } from '../../../../../../../../types';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

const notFound = (responseBody: CompanyHouseResponse, errors: object) => {
  let updatedErrors = errors;

  // if success is false, then company cannot be found by companies house API
  if (responseBody.success === false) {
    const errorMessage = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].NOT_FOUND;
    updatedErrors = generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, errors);
  }

  return updatedErrors;
};

export default notFound;
