import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/loss-payee-financial-details-uk';
import save from '../../save-data/loss-payee-financial-details-uk';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * lossPayeeFinancialDetailsUk
 * mapAndSave lossPayeeFinancialDetails
 * Map and save any valid nominatedLossPayee fields
 * @param {RequestBody} formBody: Form body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const lossPayeeFinancialDetailsUk = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.lossPayeeFinancialDetailsUk(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.lossPayeeFinancialDetailsUk(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving application - policy - loss payee financial details UK %O', err);

    return false;
  }
};

export default {
  lossPayeeFinancialDetailsUk,
};
