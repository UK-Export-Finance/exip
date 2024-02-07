import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/jointly-insured-party';
import save from '../../save-data/jointly-insured-party';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave jointlyInsuredParty
 * Map and save any valid jointlyInsuredParty fields
 * @param {Express.Request.body} Express request body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const jointlyInsuredParty = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody, application);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.jointlyInsuredParty(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.jointlyInsuredParty(application, populatedData);
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
  jointlyInsuredParty,
};
