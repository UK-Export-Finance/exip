import { SHARED } from '../shared';

export const MODERN_SLAVERY = {
  ...SHARED,
  PAGE_TITLE: 'Modern slavery',
  INTRO: {
    ANSWER_THE_QUESTIONS: 'Answer the questions about complying with modern slavery legislation and the',
    GUIDING_PRINCIPLES_LINK: {
      TEXT: 'UN Guiding Principles on Business and Human Rights',
      HREF: '#',
    },
    IF_YOU_SAY_NO: 'If you say no to any of the questions you must explain why.',
  },
  EXPANDABLE: {
    VERSIONS: [
      {
        VERSION: '1',
        INTRO: 'Definition of terms in this declaration',
        TABLE: {
          HEADERS: {
            TERM: 'Term',
            DEFINITION: 'Definition',
          },
          BODY: [
            {
              TERM: 'Holding company',
              DEFINITION: [{ TEXT: 'Means, in relation to a person, any other person in respect of which it is a Subsidiary.' }],
            },
            {
              TERM: 'Modern slavery',
              DEFINITION: [
                {
                  TEXT: 'Means the recruitment, movement, harbouring or receiving of children, women or men through the use of force, coercion, abuse of vulnerability, deception or other means for the purpose of exploitation and includes holding a person in a position of slavery, servitude forced or compulsory labour, or facilitating their travel with the intention of exploiting them soon after.',
                },
              ],
            },
            {
              TERM: 'Subsidiary',
              DEFINITION: [
                {
                  CHILDREN: [
                    {
                      TEXT: 'Means a subsidiary within the meaning of ',
                    },
                    {
                      HREF: '#',
                      TEXT: 'section 1159 of the Companies Act 2006',
                    },
                    {
                      TEXT: '.',
                    },
                  ],
                },
              ],
            },
            {
              TERM: 'The Modern Slavery Act 2015',
              DEFINITION: [
                {
                  CHILDREN: [
                    {
                      TEXT: 'The ',
                    },
                    {
                      HREF: '#',
                      TEXT: 'Modern Slavery Act 2015',
                    },
                    {
                      TEXT: ' is an Act of the Parliament of the United Kingdom. It is designed to combat modern slavery in the UK and consolidates previous offences relating to trafficking and slavery. The Act also imposes reporting obligations on businesses that exceed a given annual turnover value and that carry out business in the UK. Please refer to ',
                    },
                    {
                      HREF: '#',
                      TEXT: 'the guidance on the reporting obligations established by the Act',
                    },
                    {
                      TEXT: 'for further information.',
                    },
                  ],
                },
              ],
            },
            {
              TERM: 'UN Guiding Principles  on Business and Human Rights',
              DEFINITION: [
                {
                  TEXT: 'The UN Guiding Principles on Business and Human Rights (Guiding Principles on Business and Human Rights: Implementing the United Nations "Protect, Respect and Remedy" Framework | OHCHR) provide guidance and advice on the approach companies should take to respecting human rights wherever they operate.',
                },
              ],
            },
          ],
        },
      },
    ],
  },
};
