import { ApplicationBroker } from '../../../../../../types';

/**
 * mapBrokerAddressBasedInTheUk
 * Map an application's broker "based in the UK" address fields into a string for an XLSX object/column
 * A broker's UK address is saved in multiple fields.
 * The XLSX requires this data to be rendered in a single string field/column.
 * @param {ApplicationBroker} broker
 * @returns {String} Broker UK address string
 */
const mapBrokerAddressBasedInTheUk = (broker: ApplicationBroker) => {
  const { buildingNumberOrName, addressLine1, addressLine2, town, county, postcode } = broker;

  let addressString = `${buildingNumberOrName}\n${addressLine1}\n`;

  if (addressLine2) {
    addressString += `${addressLine2}\n`;
  }

  if (town) {
    addressString += `${town}\n`;
  }

  if (county) {
    addressString += `${county}\n`;
  }

  addressString += postcode;

  return addressString;
};

export default mapBrokerAddressBasedInTheUk;
