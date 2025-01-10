import { MappedOrdnanceSurveyAddress, ObjectType } from '../../../types';

/**
 * getChosenOrdnanceSurveyAddress
 * Get a chosen Ordnance Survey address from the provided params.
 * @param {ObjectType} payload: Form body payload
 * @param {String} fieldId: Field ID
 * @param {Array<MappedOrdnanceSurveyAddress>} addresses: Mapped Ordnance Survey addressess
 * @returns {MappedOrdnanceSurveyAddress}
 */
const getChosenOrdnanceSurveyAddress = (payload: ObjectType, fieldId: string, addresses: Array<MappedOrdnanceSurveyAddress>): MappedOrdnanceSurveyAddress => {
  const answer = payload[fieldId];

  if (addresses[answer]) {
    /**
     * __typename needs to be removed.
     * Otherwise,a data saving tries to save with __typename.
     */
    const { __typename, ...chosenAddress } = addresses[answer];

    return chosenAddress;
  }

  return {};
};

export default getChosenOrdnanceSurveyAddress;
