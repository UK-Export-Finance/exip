import FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { isEmptyString } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE: { IS_CHARGING },
  },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent service fields.
 * @param {RequestBody} formBody: Form body
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (isEmptyString(formBody[IS_CHARGING])) {
    populatedData[IS_CHARGING] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
