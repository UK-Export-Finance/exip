import { RequestBody } from '../../../types';

/**
 * hasFormData
 * Checks if form data has values
 * @param {Express.Request.body} Form data
 * @returns {Boolean}
 */
const hasFormData = (formBody: RequestBody) => {
  const { _csrf, ...formData } = formBody;

  if (Object.keys(formData).length) {
    return true;
  }

  return false;
};

export default hasFormData;
