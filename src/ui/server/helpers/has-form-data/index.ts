import { RequestBody } from '../../../types';
import stripEmptyFormFields from '../strip-empty-form-fields';

/**
 * hasFormData
 * Checks if form data has values
 * @param {Express.Request.body} Form data
 * @returns {Boolean}
 */
const hasFormData = (formBody: RequestBody) => {
  if (!formBody) {
    return false;
  }

  const { _csrf, ...formData } = formBody;

  if (formData && Object.keys(formData).length) {
    const fieldsWithValues = stripEmptyFormFields(formData);

    if (Object.keys(fieldsWithValues).length) {
      return true;
    }
  }

  return false;
};

export default hasFormData;
