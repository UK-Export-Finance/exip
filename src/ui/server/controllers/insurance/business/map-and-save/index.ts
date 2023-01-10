import hasFormData from '../../../../helpers/has-form-data';
import save from '../save-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../types';

const companyDetailsSave = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.companyDetails(application, formBody, validationErrors.errorList);
      } else {
        saveResponse = await save.companyDetails(application, formBody);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving business section of application', { err });

    return false;
  }
};

export default {
  companyDetailsSave,
};
