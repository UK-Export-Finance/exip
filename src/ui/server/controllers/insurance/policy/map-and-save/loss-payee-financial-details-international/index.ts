import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/loss-payee-financial-details';
import save from '../../save-data/loss-payee-financial-details-international';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * lossPayeeFinancialDetailsInternational
 * mapAndSave lossPayeeFinancialDetails
 * Map and save any valid nominatedLossPayee fields
 * @param {Express.Request.body} Form data
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const lossPayeeFinancialDetailsInternational = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.lossPayeeFinancialDetailsInternational(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.lossPayeeFinancialDetailsInternational(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving application - policy - loss payee financial details international %O', err);

    return false;
  }
};

export default {
  lossPayeeFinancialDetailsInternational,
};
