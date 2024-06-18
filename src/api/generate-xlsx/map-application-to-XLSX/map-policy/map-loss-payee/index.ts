import mapAppointedLossPayee from './map-appointed-loss-payee';
import mapLossPayeeFinancialDetailsInternational from './map-financial-details-international';
import mapLossPayeeFinancialDetailsUk from './map-financial-details-uk';
import { ApplicationNominatedLossPayee } from '../../../../types';

/**
 * mapLossPayee
 * Map an application's loss payee fields into an array of objects for XLSX generation
 * @param {ApplicationNominatedLossPayee} lossPayee
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapLossPayee = (lossPayee: ApplicationNominatedLossPayee) => {
  const mapped = [...mapAppointedLossPayee(lossPayee), ...mapLossPayeeFinancialDetailsUk(lossPayee), ...mapLossPayeeFinancialDetailsInternational(lossPayee)];

  return mapped;
};

export default mapLossPayee;
