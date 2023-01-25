import insurancePartials from '../../e2e/partials/insurance';
import { POLICY_AND_EXPORT_FIELDS } from '../../../content-strings/fields/insurance/policy-and-exports';
import { SUPPORTED_CURRENCIES } from '../../../constants';
import { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy-and-exports';

const { POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const checkPolicyCurrencyCodeInput = () => {
  const fieldId = POLICY_CURRENCY_CODE;
  const field = insurancePartials.policyCurrencyCodeFormField;

  const CONTENT_STRINGS = POLICY_AND_EXPORT_FIELDS.CONTRACT_POLICY[fieldId];

  field.label().should('exist');
  field.label().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LABEL);
  });

  const hintContent = CONTENT_STRINGS.HINT;

  checkText(
    field.hint.text.usuallyIssues(),
    hintContent.USUALLY_ISSUES,
  );

  checkText(
    field.hint.text.differentCurrency(),
    hintContent.NEED_DIFFERENT_CURRENCY,
  );

  checkText(
    field.hint.link(),
    hintContent.APPLY_USING_FORM.TEXT,
  );

  field.hint.link().should('have.attr', 'href', hintContent.APPLY_USING_FORM.HREF);

  field.input().should('exist');

  field.inputOption().should('have.length', SUPPORTED_CURRENCIES.length + 1);

  field.inputFirstOption().should('be.disabled');
  field.input().select(1).should('have.value', SUPPORTED_CURRENCIES[0]);
  field.input().select(2).should('have.value', SUPPORTED_CURRENCIES[1]);
  field.input().select(3).should('have.value', SUPPORTED_CURRENCIES[2]);
};

export default checkPolicyCurrencyCodeInput;
