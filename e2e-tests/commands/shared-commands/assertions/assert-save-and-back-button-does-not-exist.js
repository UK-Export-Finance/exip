import { saveAndBackButton } from '../../../pages/shared';

/**
 * assertSaveAndBackButtonDoesNotExist
 * Check that a "Save and back" button does not exist.
 */
const assertSaveAndBackButtonDoesNotExist = () => {
  saveAndBackButton().should('not.exist');
};
export default assertSaveAndBackButtonDoesNotExist;
