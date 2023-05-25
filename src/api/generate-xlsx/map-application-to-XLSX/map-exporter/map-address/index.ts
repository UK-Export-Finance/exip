import NEW_LINE from '../../helpers/xlsx-new-line';
import { ApplicationCompanyAddress } from '../../../../types';

/**
 * mapExporterAddress
 * Map an exporter's address
 * @param {Object} Exporter address
 * @returns {String} Exporter address string
 */
const mapExporterAddress = (address: ApplicationCompanyAddress) => {
  let addressString = '';

  Object.keys(address).forEach((field) => {
    if (address[field] && field !== 'id' && field !== '__typename') {
      addressString += `${address[field]}${NEW_LINE}`;
    }
  });

  return addressString;
};

export default mapExporterAddress;
