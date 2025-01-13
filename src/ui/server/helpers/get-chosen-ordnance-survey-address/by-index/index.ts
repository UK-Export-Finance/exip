import { MappedOrdnanceSurveyAddress } from '../../../../types';

interface GetChosenOrdnanceSurveyAddressByIndexParams {
  addresses: Array<MappedOrdnanceSurveyAddress>;
  index?: number;
}

/**
 * getChosenOrdnanceSurveyAddressByIndex
 * Get a chosen Ordnance Survey address by index
 * @param {Array<MappedOrdnanceSurveyAddress>} addresses: Mapped Ordnance Survey addressess
 * @param {Integer} index
 * @returns {MappedOrdnanceSurveyAddress}
 */
const getChosenOrdnanceSurveyAddressByIndex = ({ addresses, index = 0 }: GetChosenOrdnanceSurveyAddressByIndexParams): MappedOrdnanceSurveyAddress => {
  if (addresses[index]) {
    const addressObj = addresses[index];

    /**
     * __typename needs to be removed.
     * Otherwise, a data saving tries to save with __typename.
     */
    const { __typename, ...chosenAddress } = addressObj;

    return chosenAddress;
  }

  return {};
};

export default getChosenOrdnanceSurveyAddressByIndex;
