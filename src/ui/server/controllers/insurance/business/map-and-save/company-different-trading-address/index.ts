import hasFormData from '../../../../../helpers/has-form-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';
import save from '../../save-data/company-different-trading-address';
import mapSubmittedData from '../../map-submitted-data/company-different-trading-address';

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

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.companyDifferentTradingAddress(application, dataToSave, validationErrors.errorList);
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
