import { isPopulatedArray } from '../array';
import { RequestBody } from '../../../types';

/**
 * hasFormData
 * Checks if form data has values
 * @param {Express.Request.body} formBody
 * @returns {boolean}
 */
const hasFormData = (formBody: RequestBody) => {
  const { _csrf, ...formData } = formBody;

  if (formData && isPopulatedArray(Object.keys(formData))) {
    return true;
  }

  return false;
};

export default hasFormData;
