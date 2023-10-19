import Joi from 'joi';
import { ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS } from '../../../../constants';
import generateValidationErrors from '../../../validation';
import { RequestBody, ValidationErrors } from '../../../../../types';

const { COMPANIES_HOUSE_NUMBER } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * Schema to check that the number:
 * - only contains letters and/or numbers
 * - has a length greater than 6
 */
const schema = Joi.string().alphanum().min(6).required();

/**
 * validates companies house input
 * throws validation errors if does not follow JOI schema for minimum length, if special characters or is blank
 * @param formBody containing an object with the companies house input
 * @returns object containing errors or blank object
 */
const companiesHouseNumber = (formBody: RequestBody, errors: ValidationErrors) => {
  let updatedErrors = errors;

  const validation = schema.validate(formBody[COMPANIES_HOUSE_NUMBER]);

  // if error, then has failed schema check
  if (validation.error) {
    const errorMessage = EXPORTER_BUSINESS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;
    updatedErrors = generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, errors);
  }

  return updatedErrors;
};

export default companiesHouseNumber;
