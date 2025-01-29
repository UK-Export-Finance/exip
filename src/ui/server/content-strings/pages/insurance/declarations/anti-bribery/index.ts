import { SHARED, CONFIRM_READ_AND_AGREE, HAVE_READ_AND_AGREED } from '../shared';

const EXPANDABLE = {
  INTRO: 'Definition of terms',
  TABLE: {
    HEADERS: {
      TERM: 'Term',
      DEFINITION: 'Definition',
    },
    BODY: [
      {
        TERM: 'Consortium Party or Agent',
        DEFINITION: [{ TEXT: 'Is a consortium party or agent name in this application' }],
      },
      {
        TERM: 'Controlled',
        DEFINITION: [
          {
            TEXT: 'Means in relation to a body corporate (Company “A”), the power of a person (“P”) to secure (a) by means of the holding of shares or the possession of voting power in relation to that or any other body corporate;',
          },
          {
            TEXT: "or (b) as a result of any powers conferred by the articles of association or other document or arrangement regulating that or any other body corporate, that the affairs of Company A are conducted in accordance with P's wishes;",
          },
        ],
      },
      {
        TERM: 'Corrupt Activity',
        DEFINITION: [
          {
            TEXT: 'Means any activity with reference to a person (including without limitation the offering of any payment, reward or other advantage to any public official or other person), which is (a) found by a court in a competent jurisdiction (after all available rights of appeal have been exhausted) to have rendered the export contract illegal, void, voidable or unenforceable under its governing law;',
          },
          {
            TEXT: 'or (b) other than under duress, has been admitted by that person (which shall include, for the avoidance of doubt, admissions of activity made under a deferred prosecution agreement in England, civil forfeiture order or similar administrative settlement in another jurisdiction);',
          },
          {
            TEXT: 'or (c) is found by a court or competent authority in any competent jurisdiction (after all available rights of appeal have been exhausted) outside the United Kingdom to constitute an offence under any applicable law (except by virtue of changes to that law having retrospective effect);',
          },
          {
            TEXT: 'or (d) is found by a court or competent authority in the United Kingdom (after all available rights of appeal have been exhausted) to constitute a Relevant Offence and which activity in respect of paragraphs (a), (b) and (c) above corresponds to a Relevant Offence provided that, where for the purposes of paragraph (b) above, any such activity is admitted by an Excluded Person, such activity shall not, for the purposes of this policy, constitute "Corrupt Activity" if such activity was not, at the time it was engaged in, unlawful under the laws or regulations of the country in which it took place;',
          },
        ],
      },
      {
        TERM: 'Directors',
        DEFINITION: [
          {
            TEXT: "Means in relation to a company all the members of that company's board of directors (including non-executive directors);",
          },
        ],
      },
      {
        TERM: 'Excluded Person',
        DEFINITION: [
          {
            TEXT: 'Means (a) where such activity is engaged in prior to 1 July 2011, (i) a person other than a national of the United Kingdom (as defined in s.109(4) of the Anti-terrorism, Crime and Security Act 2001); or (ii) a body incorporated under the laws of a country other than the United Kingdom;',
          },
          {
            TEXT: 'and where such activity is engaged in on or after that date, a person or body of a type not listed in s.12(4) of the Bribery Act 2010;',
          },
        ],
      },
      {
        TERM: 'Group Company',
        DEFINITION: [
          {
            TEXT: 'Means a company (in any jurisdiction) which is Controlled by the Applicant or which controls the Applicant or which is Controlled by a company which controls the Applicant.',
          },
        ],
      },
      {
        TERM: 'Involved Group Company',
        DEFINITION: [
          {
            TEXT: 'Means a group company which (a) having made the reasonable enquires referred to in paragraph 8(ii) of the anti-bribery and corruption declaration, has had, or is intended to have, at the date of this Proposal, any material part in the negotiation or obtaining of the export contract;',
          },
          {
            TEXT: '(b) employs personnel providing head office, legal, compliance, audit and/ or similar functions.',
          },
        ],
      },
      {
        TERM: 'Potential Corrupt Activity',
        DEFINITION: [
          {
            TEXT: 'Means activity which could, subject to the occurrence of subsequent events referred to in (a), (c) and (d) of the definition of “Corrupt Activity” in this anti-bribery and corruption declaration.',
          },
        ],
      },
      {
        TERM: 'Relevant Offence',
        DEFINITION: [
          {
            TEXT: 'Means, in relation to acts committed or events occurring before 1st July 2011, an offence under the Prevention of Corruption Acts 1889 to 1916 as amended by Part 12 of the Anti-terrorism Crime and Security Act 2001 and/ or an offence of conspiracy to corrupt under the Criminal Law Act 1977 or under common law, or, in relation to acts committed or events occurring on or after 1st July 2011, an offence under sections 1, 2, 6, or 7 of the Bribery Act 2010 (as from time to time amended or re-enacted).',
          },
        ],
      },
      {
        TERM: 'Senior Officer',
        DEFINITION: [
          {
            TEXT: 'Means in relation to: (a) a body corporate, a Director or senior executive of the body corporate;',
          },
          {
            TEXT: '(b) a partnership, a partner in the partnership;',
          },
          {
            TEXT: 'and (c) a limited liability partnership (LLP) all members or, if applicable, all those members appointed or entitled to manage the LLP',
          },
        ],
      },
    ],
  },
};

const INTRO = "By submitting this application (also known as a 'Proposal') you agree that:";

const LIST = [
  {
    text: 'neither you nor any of your current Senior Officers appear on a debarment list published by the World Bank Group, the African Development Bank, the Asian Development Bank, the European Bank for Reconstruction and Development or the Inter-American Development Bank (or any successor organisations of the foregoing), of contractors or individuals who are ineligible to tender for, or participate in, any project they fund;',
  },
  {
    text: 'you have no reason to believe, after having made reasonable enquiries, that any Involved Group Company, Consortium Party or Agent, or any of their current Senior Officers, appear on any such list;',
  },
  {
    text: 'during the last 5 years neither you nor any of your current Senior Officers or any Group Company have:',
    children: [
      {
        text: 'been found guilty by any court or competent authority of a Relevant Offence or any offence relating to bribery or corruption under the law of any jurisdiction outside the UK;',
      },
      {
        text: 'been subject to any administrative sanction (for example, a deferred prosecution agreement or civil forfeiture order) or other similar administrative measure anywhere in the world for contravening any laws which prohibit bribery, including bribery of foreign public officials; or',
      },
      {
        text: 'admitted to having engaged in any offence or activity as referred to in paragraph (3)(a) above or has admitted to engaging in any other activity which is prohibited under applicable laws relating to bribery or corrupt activity;',
      },
    ],
  },
  {
    text: 'neither you nor any of your current Senior Officers or any Group Company are currently under charge in any court or before any competent authority, or to the best of your knowledge, subject to a formal investigation by public prosecutors on the grounds that you or they have committed an offence of the type listed in paragraph 3(a) above;',
  },
  {
    text: 'neither you nor any Group Company has: engaged in, any Potential Corrupt Activity or Corrupt Activity in relation to the export contract(s) or any related agreement (which includes any unilateral undertaking as well as any consent or authorisation needed to obtain or perform the export contract(s) but not any subcontract);',
  },
  {
    text: 'neither you nor any Involved Group Company has any knowledge of any person engaging in any Potential Corrupt Activity or Corrupt Activity in relation to the export contract(s) or any related agreement;',
  },
  {
    text: 'you have no reason to believe and you do not believe, after having made reasonable enquiries, that:',
    children: [
      {
        text: 'any Consortium Party or Agent, any of their current Senior Officers has at any time during the last five years engaged in or been subject to any of the events referred to in paragraph (3) above;',
      },
      {
        text: 'any Consortium Party or Agent or any of their current Senior Officers has at any time during the last five years been subject to any of the events referred to in paragraph (4) above; or',
      },
      {
        text: 'any Consortium Party or Agent has engaged in any Potential Corrupt Activity or Corrupt Activity in relation to the export contract(s) or any related agreement;',
      },
    ],
  },
  {
    text: 'you have made reasonable enquiries regarding (i) any Consortium Party or Agent and its conduct in relation to the export contract and any related agreement; and (ii) whether any Group Companies, at the date of this Proposal, have had, or are intended to have any material part in the negotiation or supply of the export contract;',
  },
  {
    text: 'the export contract(s) referred to in this Proposal , and all arrangements connected with its/their financing or procurement, have not been, and will not be, used for the purposes of money laundering (as defined in Part 7 of the Proceeds of Crime Act 2002) or in any other manner that would constitute a Relevant Offence.',
  },
];

const PAGE_TITLE = 'Anti-bribery and corruption';
const LABEL = `${CONFIRM_READ_AND_AGREE} the anti-bribery and corruption declaration`;
const OPTION = {
  TEXT: `${HAVE_READ_AND_AGREED} the anti-bribery and corruption declaration`,
  VALUE: true,
};

export const ANTI_BRIBERY = {
  VERSIONS: [
    {
      VERSION: '1',
      ...SHARED,
      PAGE_TITLE,
      LABEL,
      OPTION,
      EXPANDABLE,
      INTRO,
      LIST,
    },
    {
      VERSION: '2',
      ...SHARED,
      PAGE_TITLE,
      LABEL,
      OPTION,
      INTRO,
      LIST,
      EXPANDABLE: {
        ...EXPANDABLE,
        TABLE: {
          ...EXPANDABLE.TABLE,
          BODY: [
            EXPANDABLE.TABLE.BODY[0],
            EXPANDABLE.TABLE.BODY[1],
            {
              TERM: 'Corrupt Activity',
              DEFINITION: [
                {
                  TEXT: 'Means any activity with reference to a person (including without limitation the offering of any payment, reward or other advantage to any public official or other person), which is',
                },
                {
                  TEXT: '(a) found by a court in a competent jurisdiction (after all available rights of appeal have been exhausted) to have rendered the export contract illegal, void, voidable or unenforceable under its governing law;',
                },
                { TEXT: 'or' },
                {
                  TEXT: '(b) other than under duress, has been admitted by that person (which shall include, for the avoidance of doubt, admissions of activity made under a deferred prosecution agreement in England, civil forfeiture order or similar administrative settlement in another jurisdiction);',
                },
                { TEXT: 'or' },
                {
                  TEXT: '(c) is found by a court or competent authority in any competent jurisdiction (after all available rights of appeal have been exhausted) outside the United Kingdom to constitute an offence under any applicable law (except by virtue of changes to that law having retrospective effect);',
                },
                {
                  TEXT: 'or',
                },
                {
                  TEXT: '(d) is found by a court or competent authority in the United Kingdom (after all available rights of appeal have been exhausted) to constitute a Relevant Offence and which activity in respect of paragraphs (a), (b) and (c) above corresponds to a Relevant Offence provided that, where for the purposes of paragraph (b) above, any such activity is admitted by an Excluded Person, such activity shall not, for the purposes of this policy, constitute “Corrupt Activity” if such activity was not, at the time it was engaged in, unlawful under the laws or regulations of the country in which it took place;',
                },
              ],
            },
            EXPANDABLE.TABLE.BODY[3],
            {
              TERM: 'Excluded Person',
              DEFINITION: [
                { TEXT: 'Means' },
                {
                  TEXT: '(a) where such activity is engaged in prior to 1 July 2011, (i) a person other than a national of the United Kingdom (as defined in s.109(4) of the Anti-terrorism, Crime and Security Act 2001); or (ii) a body incorporated under the laws of a country other than the United Kingdom;',
                },
                { TEXT: 'and' },
                {
                  TEXT: '(b) where such activity is engaged in on or after that date, a person or body of a type not listed in s.12(4) of the Bribery Act 2010;',
                },
              ],
            },
            EXPANDABLE.TABLE.BODY[5],
            {
              TERM: 'Involved Group Company',
              DEFINITION: [
                {
                  TEXT: 'Means a Group Company which (a) having made the reasonable enquiries referred to in paragraph 8(ii) above, has had, or is intended to have, at the date of this Proposal, any material part in the negotiation or obtaining of the export contract.',
                },
              ],
            },
            EXPANDABLE.TABLE.BODY[7],
            EXPANDABLE.TABLE.BODY[8],
            EXPANDABLE.TABLE.BODY[9],
          ],
        },
      },
    },
  ],
};
