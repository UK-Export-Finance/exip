import FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { isEmptyString } from '../../../../../helpers/string';
import { RequestBody, ObjectType } from '../../../../../../types';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE: { IS_CHARGING },
  },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent service fields.
 * @param {RequestBody} formBody: Form body
 * @returns {ObjectType} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): ObjectType => {
  const populatedData = formBody;

  /**
   * If IS_CHARGING is an empty string,
   * nullify the field.
   */
  if (isEmptyString(formBody[IS_CHARGING])) {
    populatedData[IS_CHARGING] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
