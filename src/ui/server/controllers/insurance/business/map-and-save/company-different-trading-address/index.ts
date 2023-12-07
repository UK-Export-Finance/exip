import hasFormData from '../../../../../helpers/has-form-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';
import save from '../../save-data/company-different-trading-address';
import { mapSubmittedData, mapErrors } from '../../map-submitted-data/company-different-trading-address';

/**
 * maps differentTradingAddress data and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {Object} application
 * @param {Object} validationErrors
 * @returns {Boolean}
 */
const companyDifferentTradingAddress = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const dataToSave = mapSubmittedData(formBody);
      /**
       * maps errors for companyDifferentAddress
       * Adds errors for fullAddress to validationErrors object
       * As field is fullAddress in database
       */
      const errors = mapErrors(validationErrors) as ValidationErrors;

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.companyDifferentTradingAddress(application, dataToSave, errors.errorList);
      } else {
        saveResponse = await save.companyDifferentTradingAddress(application, dataToSave);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving companyDifferentTradingAddress section of application %O', err);
    return false;
  }
};

export default { companyDifferentTradingAddress };
