import { isPopulatedArray } from '../../array';
import { getSubmittedFields } from '../../get-submitted-fields';
import { ApplicationFlat } from '../../../../types';

/**
 * sectionIsComplete
 * @param {Array} fields Array of field ids associated with the task
 * @param {Object} submittedData Submitted application data
 * @returns {Boolean}
 */
const sectionIsComplete = (fields: Array<string>, submittedData: ApplicationFlat): boolean => {
  const submittedFields = getSubmittedFields(fields, submittedData);

  if (isPopulatedArray(submittedFields) && isPopulatedArray(fields)) {
    if (submittedFields.length === fields.length) {
      return true;
    }
  }

  return false;
};

export default sectionIsComplete;
