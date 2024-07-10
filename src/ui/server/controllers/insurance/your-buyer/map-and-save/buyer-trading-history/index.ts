import hasFormData from '../../../../../helpers/has-form-data';
import save from '../../save-data/buyer-trading-history';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';
import mapSubmittedData from '../../map-submitted-data/buyer-trading-history';

/**
 * maps buyerTradingHistory request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {Object} application
 * @param {Object} validationErrors
 * @returns {Boolean}
 */
const buyerTradingHistory = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      let saveResponse;

      const populatedData = mapSubmittedData(formBody);

      if (validationErrors) {
        saveResponse = await save.buyerTradingHistory(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.buyerTradingHistory(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving buyer section of application %O', err);
    return false;
  }
};

export default {
  buyerTradingHistory,
};
