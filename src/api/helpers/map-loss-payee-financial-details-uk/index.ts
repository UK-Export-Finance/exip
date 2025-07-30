import encrypt from '../encrypt';
import { DEFAULT_ENCRYPTION_SAVE_OBJECT } from '../../constants';
import { ApplicationLossPayeeFinancialUk } from '../../types';

/**
 * mapLossPayeeFinancialDetails
 * maps loss payee financial to generate object for saving
 * @param {ApplicationLossPayeeFinancialUk} variables: loss payee financial uk variables
 * @returns {object} mapped data for saving
 */
const mapLossPayeeFinancialDetailsUk = (variables: ApplicationLossPayeeFinancialUk) => {
  try {
    console.info('Mapping loss payee financial UK');

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
      uk: {
        accountNumber: accountNumberData.value,
        sortCode: sortCodeData.value,
        bankAddress,
      },
      vectors: {
        accountNumberVector: accountNumberData.iv,
        sortCodeVector: sortCodeData.iv,
      },
    };

    return updateData;
  } catch (error) {
    console.error('Error mapping loss payee financial UK %o', error);

    throw new Error(`Error mapping loss payee financial UK ${error}`);
  }
};

export default mapLossPayeeFinancialDetailsUk;
