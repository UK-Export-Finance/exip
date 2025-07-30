import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import replaceNewLineWithLineBreak from '../replace-new-line-with-line-break';
import generateMultipleFieldHtml from '../generate-multiple-field-html';
import { ApplicationBroker } from '../../../types';

const {
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

/**
 * generateBrokerAddressInsetTextHtml
 * Generate address HTML for the GOV Inset text component.
 * Depending on the submitted data, the address data could be in one of the following formats:
 * 1) FULL_ADDRESS (a single string with line break characters)
 * 2) Broker object with address line 1, address line 2, postcode etc.
 * Therefore we need to use different helpers depending on the data.
 * @param {ApplicationBroker} broker
 * @returns {string} Broker address string with <br />'s
 */
const generateBrokerAddressInsetTextHtml = (broker: ApplicationBroker) => {
  if (broker[FULL_ADDRESS]) {
    /**
     * Transform \r\n characters into <br />,
     * so that the string will render with multiple lines.
     */
    return replaceNewLineWithLineBreak(broker[FULL_ADDRESS]);
  }

  const { addressLine1, addressLine2, town, county, postcode } = broker;

  /**
   * Transform fields in an object into a single string with <br />'s,
   * so that the data will render as a single string with multiple lines.
   */
  return generateMultipleFieldHtml({
    addressLine1,
    addressLine2,
    town,
    county,
    postcode,
  });
};

export default generateBrokerAddressInsetTextHtml;
