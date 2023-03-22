import { ApplicationFlat } from '../../../../types';
import { getSubmittedFields } from '../../get-submitted-fields';

/**
 * taskIsComplete
 * @param {Array} taskFields Array of field ids associated with the tak
 * @param {Object} submittedData Submitted application data
 * @returns {Boolean}
 */
const sectionIsComplete = (taskFields: Array<string>, submittedData: ApplicationFlat): boolean => {
  const submittedFields = getSubmittedFields(taskFields, submittedData);
  if (submittedFields && submittedFields.length && taskFields && taskFields.length) {
    if (submittedFields.length === taskFields.length) {
      return true;
    }
  }

  return false;
};

export default sectionIsComplete;
