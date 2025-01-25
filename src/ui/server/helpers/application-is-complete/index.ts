import flattenApplicationData from '../flatten-application-data';
import { getSubmittedFields } from '../get-submitted-fields';
import requiredPrepareApplicationFields from '../required-fields/prepare-application';
import requiredCheckYourAnswersFields from '../required-fields/check-your-answers';
import requiredDeclarationsFields from '../required-fields/declarations';
import { Application } from '../../../types';

/**
 * applicationIsComplete
 * Check if the application is complete
 * @param {Application} application
 * @returns {Boolean}
 */
const applicationIsComplete = (application: Application): boolean => {
  const { declaration } = application;

  const flatApplicationData = flattenApplicationData(application);

  const requiredFieldIds = [
    ...requiredPrepareApplicationFields(flatApplicationData),
    ...requiredCheckYourAnswersFields(flatApplicationData),
    ...requiredDeclarationsFields(declaration),
  ];

  const submittedFieldIds = getSubmittedFields(requiredFieldIds, flatApplicationData);

  if (requiredFieldIds.length === submittedFieldIds.length) {
    return true;
  }

  return false;
};

export default applicationIsComplete;
