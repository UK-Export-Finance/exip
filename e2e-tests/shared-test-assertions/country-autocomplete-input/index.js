import assertions from '../autocomplete-assertions';
import { autoCompleteField } from '../../pages/shared';
import { XAD, DZA } from '../../fixtures/countries';

const { NAME: ABU_DHABI } = XAD;
const { NAME: ALGERIA } = DZA;

/**
 * assertCountryAutocompleteInput
 * Assert a country autocomplete field
 * @param {String} fieldId: Country field ID
 */
export const assertCountryAutocompleteInput = ({
  fieldId,
}) => {
  const field = autoCompleteField(fieldId);

  it('has working client side JS', () => {
    assertions.hasWorkingClientSideJS(field);
  });

  it('renders an input', () => {
    assertions.rendersInput(field);
  });

  it('renders `no results` message when no results are found', () => {
    assertions.rendersNoResultsMessage(field, 'test');
  });

  it('renders a single country result after searching', () => {
    assertions.rendersSingleResult(field, 'Alg');
  });

  it('renders multiple country results after searching', () => {
    assertions.rendersMultipleResults(field);
  });

  it('allows user to remove a selected country and search again', () => {
    assertions.allowsUserToRemoveCountryAndSearchAgain(fieldId, ABU_DHABI, ALGERIA, ALGERIA);
  });
};

export default assertCountryAutocompleteInput;
