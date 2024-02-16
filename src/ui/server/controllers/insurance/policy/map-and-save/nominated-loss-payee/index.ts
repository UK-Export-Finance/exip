import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/jointly-insured-party';
import save from '../../save-data/nominated-loss-payee';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave nominatedLossPayee
 * Map and save any valid nominatedLossPayee fields
 * @param {Express.Request.body} Express request body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const nominatedLossPayee = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.nominatedLossPayee(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.nominatedLossPayee(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving application - policy - jointly insured party %O', err);

    return false;
  }
};

export default {
  nominatedLossPayee,
};
