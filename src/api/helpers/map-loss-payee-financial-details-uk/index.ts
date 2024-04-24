import encrypt from '../encrypt';
import { DEFAULT_ENCRYPTION_SAVE_OBJECT } from '../../constants';
import { ApplicationLossPayeeFinancialUk } from '../../types';

/**
 * mapLossPayeeFinancialDetails
 * maps loss payee financial details to generate object for saving
 * @param {ApplicationLossPayeeFinancialUk} variables: loss payee financial uk variables
 * @returns {Object} mapped data for saving
 */
const mapLossPayeeFinancialDetailsUk = (variables: ApplicationLossPayeeFinancialUk) => {
  try {
    console.info('Mapping loss payee financial details UK');

    const { accountNumber, sortCode, bankAddress } = variables;

    let accountNumberData = DEFAULT_ENCRYPTION_SAVE_OBJECT;

    let sortCodeData = DEFAULT_ENCRYPTION_SAVE_OBJECT;

    if (accountNumber) {
      accountNumberData = encrypt(accountNumber);
    }

    if (sortCode) {
      sortCodeData = encrypt(sortCode);
    }

    /**
     * object with encrypted data and initialisation vectors
     * encrypts accountNumber and sortCode
     * adds the initialisation vectors
     */
    const updateData = {
      accountNumber: accountNumberData.value,
      accountNumberVector: accountNumberData.iv,
      sortCode: sortCodeData.value,
      sortCodeVector: sortCodeData.iv,
      bankAddress,
    };

    return updateData;
  } catch (err) {
    console.error('Error mapping loss payee financial details UK %O', err);

    throw new Error(`Error mapping loss payee financial details UK ${err}`);
  }
};

export default mapLossPayeeFinancialDetailsUk;
