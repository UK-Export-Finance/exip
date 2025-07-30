import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/jointly-insured-party';
import save from '../../save-data/jointly-insured-party';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave jointlyInsuredParty
 * Map and save any valid jointlyInsuredParty fields
 * @param {RequestBody} formBody: Form body
 * @param {Application} application
 * @param {object} validationErrors: Validation errors
 * @returns {boolean}
 */
const jointlyInsuredParty = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.jointlyInsuredParty(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.jointlyInsuredParty(application, populatedData);
      }

      if (!saveResponse) {
        console.error('No save response received from save.jointlyInsuredParty %s', application.id);

        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving application - policy - jointly insured party %o', error);

    return false;
  }
};

export default {
  jointlyInsuredParty,
};
