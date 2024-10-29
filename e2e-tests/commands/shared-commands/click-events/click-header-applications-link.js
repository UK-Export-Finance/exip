import { header } from '../../../partials';

/**
 * clickHeaderApplicationsLink
 * Click the "applications" link in the header.
 */
const clickHeaderApplicationsLink = () => {
  header.navigation.applications().click();
};

export default clickHeaderApplicationsLink;
