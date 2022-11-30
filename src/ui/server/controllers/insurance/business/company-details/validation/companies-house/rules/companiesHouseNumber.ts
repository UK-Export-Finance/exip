import Joi from 'joi';

import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../../types';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

// schema to check that number only contains letters and/or numbers and has a length greater than 6
const schema = Joi.string().alphanum().min(6).required();

const companiesHouseNumber = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  const validation = schema.validate(formBody[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT]);

  // if error, then has failed schema check
  if (validation.error) {
    const errorMessage = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
    updatedErrors = generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, errors);
  }

  return updatedErrors;
};

export default companiesHouseNumber;
