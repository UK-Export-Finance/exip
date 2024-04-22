import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/policy-contact';
import save from '../../save-data/policy-contact';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave policyContact
 * Map and save any valid policyContact fields
 * @param {RequestBody} formBody: Form body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const policyContact = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody, application);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.policyContact(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.policyContact(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving application - policy - contact %O', err);

    return false;
  }
};

export default {
  policyContact,
};
