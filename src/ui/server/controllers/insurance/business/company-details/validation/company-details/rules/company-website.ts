import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import { RequestBody } from '../../../../../../../../types';
import isStringWithHttp from '../../../../../../../helpers/is-string-with-http';
import validateWebsiteAddress from '../../../../../../../shared-validation/website-address';
import { objectHasProperty } from '../../../../../../../helpers/object';

const {
  YOUR_COMPANY: { WEBSITE },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
/**
 * validates website input is the correct format
 * @param {RequestBody} formBody
 * @param {object} errors
 * @returns {object} errors
 */
const companyWebsite = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  // as field is optional, only validate if it is not an empty string
  if (objectHasProperty(formBody, WEBSITE)) {
    // adds 'http://' to url for validation
    const url = isStringWithHttp(formBody[WEBSITE]);
    const errorMessage = EXPORTER_BUSINESS[WEBSITE].INCORRECT_FORMAT;
    // validates input
    updatedErrors = validateWebsiteAddress(url, WEBSITE, errorMessage, updatedErrors);
  }

  return updatedErrors;
};

export default companyWebsite;
