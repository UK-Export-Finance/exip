import mapAndSave from '../map-and-save';
import { Application, RequestBody, ValidationErrors } from '../../../../../types';

const callMapAndSave = async (formData: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    let saveResponse;

    if (validationErrors) {
      saveResponse = await mapAndSave.policyAndExport(formData, application, validationErrors);

      return saveResponse;
    }

    saveResponse = await mapAndSave.policyAndExport(formData, application);

    return saveResponse;
  } catch (err) {
    console.error('Error calling mapAndSave.policyAndExport', { err });

    return false;
  }
};

export default callMapAndSave;
