import Joi from 'joi';
import { ERROR_MESSAGES } from '../../../../content-strings';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { objectHasProperty } from '../../../object';
import generateValidationErrors from '../../../validation';
import { RequestBody, ValidationErrors } from '../../../../../types';

const {
  COMPANY_HOUSE: { COMPANY_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const { ELIGIBILITY } = ERROR_MESSAGES.INSURANCE;

/**
 * Schema to check that the number:
 * - only contains letters and/or numbers
 * - has a length greater than 6
 */
const schema = Joi.string().alphanum().min(6).required();

/**
 * validates companies house input
 * 1) Check if a value has been provided.
 * 2) Check if it follows JOI schema  - minimum length, no special characters or is blank
 * @param formBody containing an object with the companies house input
 * @returns object containing errors or blank object
 */
const companiesHouseNumber = (formBody: RequestBody, errors: ValidationErrors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_ID)) {
    const errorMessage = ELIGIBILITY[FIELD_ID].IS_EMPTY;
    updatedErrors = generateValidationErrors(FIELD_ID, errorMessage, errors);

    return updatedErrors;
  }

  const validation = schema.validate(formBody[FIELD_ID]);

  // if error, then has failed schema check
  if (validation.error) {
    const errorMessage = ELIGIBILITY[FIELD_ID].INCORRECT_FORMAT;
    updatedErrors = generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  return updatedErrors;
};

export default companiesHouseNumber;
