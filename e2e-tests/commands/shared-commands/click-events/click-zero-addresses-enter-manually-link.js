import { brokerZeroAddressesPage } from '../../../pages/insurance/policy';

/**
 * clickZeroAddressesEnterManuallyLink
 * Click the "enter manually" link in the "zero addresses" page.
 */
const clickZeroAddressesEnterManuallyLink = () => {
  brokerZeroAddressesPage.outro.enterManuallyLink().click();
};

export default clickZeroAddressesEnterManuallyLink;
