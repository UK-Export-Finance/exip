import mapSubmittedData from '../../map-submitted-data/buyer-relationship';
import hasFormData from '../../../../../helpers/has-form-data';
import save from '../../save-data/buyer-relationship';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * maps buyerRelationship request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {object} application
 * @param {object} validationErrors
 * @returns {boolean}
 */
const buyerRelationship = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      let saveResponse;

      const populatedData = mapSubmittedData(formBody);

      if (validationErrors) {
        saveResponse = await save.buyerRelationship(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.buyerRelationship(application, populatedData);
      }

      if (!saveResponse) {
        console.error('No save response received from save.buyerRelationship %s', application.id);

        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving buyer relationship section of application %o', error);

    return false;
  }
};

export default {
  buyerRelationship,
};
