import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/loss-payee-financial-details';
import save from '../../save-data/loss-payee-financial-details-international';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * lossPayeeFinancialDetailsInternational
 * mapAndSave lossPayeeFinancialDetails
 * Map and save any valid nominatedLossPayee fields
 * @param {Express.Request.body} formBody
 * @param {Application} application
 * @param {object} validationErrors: Validation errors
 * @returns {boolean}
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
        console.error('No save response received from save.lossPayeeFinancialDetailsInternational %s', application.id);

        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving application - policy - loss payee financial details international %o', error);

    return false;
  }
};

export default {
  lossPayeeFinancialDetailsInternational,
};
