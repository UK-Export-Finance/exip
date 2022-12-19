import { RequestBody } from '../../../../../../types';
import { FIELD_IDS } from '../../../../../constants';
import createTimestampFromNumbers from '../../../../../helpers/date/create-timestamp-from-numbers';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
    },
  },
} = FIELD_IDS.INSURANCE;


/**
 * mapSubmittedData
 * Check form data and map any fields that need to be sent to the API/DB in a different format or structure.
 * @param {Express.Request.body} Form data
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  if (!formBody) {
    return {};
  }

  let populatedData = formBody;

  const requestedStartDateFormIds = {
    dayId: `${REQUESTED_START_DATE}-day`,
    monthId: `${REQUESTED_START_DATE}-month`,
    yearId: `${REQUESTED_START_DATE}-year`,
  };

  const { dayId, monthId, yearId } = requestedStartDateFormIds;

  if (formBody) {
    if (formBody[dayId] && formBody[monthId] && formBody[yearId]) {
      const day = Number(formBody[dayId]);
      const month = Number(formBody[monthId]);
      const year = Number(formBody[yearId]);

      populatedData[REQUESTED_START_DATE] = createTimestampFromNumbers(day, month, year);

      return populatedData;
    }
  }

  return populatedData;
};

export default mapSubmittedData;
