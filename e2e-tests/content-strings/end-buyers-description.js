import { ACTIONS } from './actions';

const { CONTACT_EFM } = ACTIONS;

export const END_BUYERS_DESCRIPTION = {
  INTRO: 'Why do we need to know about end buyers?',
  LIST_INTRO:
    'Goods or services that need to be sold on before an exporter can be paid carries extra risk. If your buyer is reliant on an end buyer, it means that we would have to cover two risks:',
  LIST: ['your buyer not paying you', 'your buyer not being paid by their end buyer'],
  OUTRO: {
    SINGLE_RISK_ONLY: 'UKEF can only provide cover for a single risk (if your buyer does not pay you).',
    IF_TRYING_MULTIPLE_RISKS: 'If you are trying to cover multiple risks',
    CONTACT_EFM,
    TO_FIND_OUT_MORE: 'to find out more about your options.',
  },
};
