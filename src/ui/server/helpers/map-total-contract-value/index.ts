import { TOTAL_CONTRACT_VALUE } from '../../constants';

/**
 * mapTotalContractValue
 * @param {Boolean} answer: total contract value answer
 * @returns {Number} Total contract value DB ID
 */
export const mapTotalContractValue = (answer: boolean) => {
  if (answer) {
    return TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID;
  }

  return TOTAL_CONTRACT_VALUE.MORE_THAN_500K.DB_ID;
};

export default mapTotalContractValue;
